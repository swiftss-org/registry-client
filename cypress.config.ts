/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { defineConfig } from 'cypress';

import { loadDatabase, resetDatabase, queryDatabase, createUser } from './cypress/test-utils/db';

export default defineConfig({
    e2e: {
        allowCypressEnv: false,
        baseUrl: 'http://localhost:3000',
        supportFile: 'cypress/support/e2e.ts',
        viewportWidth: 1280,
        viewportHeight: 720,
        specPattern: [
            'cypress/mocked-e2e/**/*.cy.{js,jsx,ts,tsx}',
            'cypress/user-journey-e2e/**/*.cy.{js,jsx,ts,tsx}',
        ],
        setupNodeEvents(on, __config) {
            on('task', {
                'db:reset': async () => {
                    return await resetDatabase();
                },
                'db:load': async () => {
                    return await loadDatabase();
                },
                'db:query': async (sql: string) => {
                    return await queryDatabase(sql);
                },
                'db:createUser': async (options: unknown) => {
                    return await createUser(options as any);
                },
                'log': (message: string) => {
                    console.log(message);
                    return null;
                },
            });
        },
    },
});
