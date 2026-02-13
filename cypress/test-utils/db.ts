import { Client } from 'pg';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'tmh_registry',
};

/**
 * Resets the database by truncating transactional tables.
 * We avoid truncating auth_user and registry_hospital to keep test users and hospitals.
 */
export async function resetDatabase() {
    const client = new Client(dbConfig);
    try {
        await client.connect();

        const tables = [
            'registry_patient',
            'registry_episode',
            'registry_discharge',
            'registry_followup',
            'registry_patienthospitalmapping',
            'registry_announcement'
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
