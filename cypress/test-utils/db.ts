import { Client } from 'pg';
import { readFile } from 'fs/promises';
import path from 'path';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'tmh_registry',
};

/**
 * Loads the test database values from the fixtures/test_data.json file
 * and inserts it into the test database.
 */
export async function loadDatabase() {
    const client = new Client(dbConfig);

    const fixturePath = path.resolve(process.cwd(), 'cypress/fixtures/test_data.json');
    const rawData = await readFile(fixturePath, 'utf-8');
    const records: Array<{
        model: string;
        pk: number | string;
        fields: Record<string, unknown>;
    }> = JSON.parse(rawData);

    const modelToTable: Record<string, string> = {
        'sites.site': 'django_site',
    };

    const pkColumnMap: Record<string, string> = {
        'authtoken.token': 'key',
    };

    const many2manyRelationExtractors: Array<{
        model: string;
        field: string;
        table: string;
        columns: [string, string];
    }> = [
            {
                model: 'registry.episode',
                field: 'surgeons',
                table: 'registry_episode_surgeons',
                columns: ['episode_id', 'medicalpersonnel_id'],
            },
            {
                model: 'registry.followup',
                field: 'attendees',
                table: 'registry_followup_attendees',
                columns: ['followup_id', 'medicalpersonnel_id'],
            },
        ];

    const tableColumnsCache = new Map<string, Set<string>>();

    const getTableColumns = async (table: string) => {
        if (tableColumnsCache.has(table)) {
            return tableColumnsCache.get(table)!;
        }
        const result = await client.query(
            `
            SELECT column_name
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = $1
            `,
            [table]
        );
        const columns = new Set(result.rows.map((row) => row.column_name));
        tableColumnsCache.set(table, columns);
        return columns;
    };

    const remapFieldsBySchema = async (
        table: string,
        fields: Record<string, unknown>
    ): Promise<Record<string, unknown>> => {
        const columns = await getTableColumns(table);
        const remapped: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(fields)) {
            if (columns.has(key)) {
                remapped[key] = value;
                continue;
            }
            const fkKey = `${key}_id`;
            if (columns.has(fkKey)) {
                remapped[fkKey] = value;
                continue;
            }
            remapped[key] = value;
        }

        return remapped;
    };

    const m2mRows: Array<{
        table: string;
        columns: [string, string];
        leftId: number | string;
        rightId: number | string;
    }> = [];

    const toTableName = (model: string) => modelToTable[model] ?? model.replace('.', '_');
    const toPkColumn = (model: string) => pkColumnMap[model] ?? 'id';

    const buildInsert = (table: string, data: Record<string, unknown>) => {
        const columns = Object.keys(data);
        const values = columns.map((key) => data[key] ?? null);
        const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
        const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders});`;
        return { sql, values };
    };

    try {
        await client.connect();
        await client.query('BEGIN');

        const tablesToTruncate = [
            'registry_followup_attendees',
            'registry_episode_surgeons',
            'registry_followup',
            'registry_discharge',
            'registry_episode',
            'registry_patienthospitalmapping',
            'registry_patient',
            'registry_preferredhospital',
            'registry_hospitalregionmapping',
            'registry_regionzonemapping',
            'registry_hospital',
            'registry_region',
            'registry_zone',
            'users_medicalpersonnel',
            'authtoken_token',
            'django_site',
            'auth_user',
        ];

        await client.query(
            `TRUNCATE TABLE ${tablesToTruncate.join(', ')} RESTART IDENTITY CASCADE;`
        );

        for (const record of records) {
            const table = toTableName(record.model);
            const pkColumn = toPkColumn(record.model);

            const cleanedFields = { ...record.fields } as Record<string, unknown>;

            for (const extractor of many2manyRelationExtractors) {
                if (record.model === extractor.model && Array.isArray(cleanedFields[extractor.field])) {
                    const items = cleanedFields[extractor.field] as Array<number | string>;
                    for (const rightId of items) {
                        m2mRows.push({
                            table: extractor.table,
                            columns: extractor.columns,
                            leftId: record.pk,
                            rightId,
                        });
                    }
                    delete cleanedFields[extractor.field];
                }
            }

            if (record.model === 'auth.user') {
                delete cleanedFields.groups;
                delete cleanedFields.user_permissions;
            }

            const remappedFields = await remapFieldsBySchema(table, cleanedFields);
            const row = { [pkColumn]: record.pk, ...remappedFields };
            const { sql, values } = buildInsert(table, row);
            await client.query(sql, values);
        }

        for (const row of m2mRows) {
            const { sql, values } = buildInsert(row.table, {
                [row.columns[0]]: row.leftId,
                [row.columns[1]]: row.rightId,
            });
            await client.query(sql, values);
        }

        // Update sequences for tables where we inserted with explicit IDs
        // This prevents IntegrityError when tests try to insert new records
        const sequenceResets = [
            'registry_patient',
            'registry_episode',
            'registry_discharge',
            'registry_followup',
            'registry_patienthospitalmapping',
            'registry_hospital',
            'registry_zone',
            'registry_region',
            'registry_hospitalregionmapping',
            'registry_regionzonemapping',
            'registry_preferredhospital',
            'users_medicalpersonnel',
            'auth_user',
            'django_site',
            'authtoken_token',
        ];

        for (const table of sequenceResets) {
            // Skip tables that use non-standard primary keys
            if (table === 'authtoken_token') continue;

            try {
                // Set sequence to MAX(id) + 1
                await client.query(`
                    SELECT setval(
                        pg_get_serial_sequence('${table}', 'id'),
                        COALESCE((SELECT MAX(id) FROM ${table}), 0) + 1,
                        false
                    );
                `);
            } catch (err) {
                // Some tables might not have an id column or sequence, that's okay
                console.log(`Skipping sequence reset for ${table}:`, err);
            }
        }

        await client.query('COMMIT');
        console.log('Database loaded successfully');
        return null;
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error loading database:', err);
        throw err;
    } finally {
        await client.end();
    }
}

/**
 * Resets the database by truncating transactional tables.
 * We avoid truncating auth_user and registry_hospital to keep test users and hospitals.
 */
export async function resetDatabase() {
    const client = new Client(dbConfig);
    try {
        await client.connect();

        const tables = [
            'registry_followup_attendees',
            'registry_episode_surgeons',
            'registry_followup',
            'registry_discharge',
            'registry_episode',
            'registry_patienthospitalmapping',
            'registry_patient',
            'registry_preferredhospital',
            'registry_hospitalregionmapping',
            'registry_regionzonemapping',
            'registry_hospital',
            'registry_region',
            'registry_zone',
            'users_medicalpersonnel',
            'authtoken_token',
            'django_site',
            'auth_user',
            'registry_announcement',
            'django_session',
            'django_admin_log',
            'django_content_type',
            'auth_permission',
            'auth_group',
            'auth_group_permissions',
            'auth_user_groups',
            'auth_user_user_permissions'
        ];

        // RESTART IDENTITY resets serial/auto-increment columns to 1
        // CASCADE handles foreign key references
        const truncateQuery = `TRUNCATE TABLE ${tables.join(', ')} RESTART IDENTITY CASCADE;`;
        await client.query(truncateQuery);

        console.log('Database reset successfully');
        return null;
    } catch (err) {
        console.error('Error resetting database:', err);
        throw err;
    } finally {
        await client.end();
    }
}

/**
 * Executes a raw SQL query and returns the results.
 */
export async function queryDatabase(sql: string) {
    const client = new Client(dbConfig);
    try {
        await client.connect();
        const res = await client.query(sql);
        return res.rows;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    } finally {
        await client.end();
    }
}
