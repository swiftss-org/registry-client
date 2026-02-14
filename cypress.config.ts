import { defineConfig } from 'cypress';
import { loadDatabase, resetDatabase, queryDatabase } from './cypress/test-utils/db';

export default defineConfig({
    e2e: {
        allowCypressEnv: true,
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        specPattern: [
            'cypress/mocked-e2e/**/*.cy.{js,jsx,ts,tsx}',
            'cypress/user-journey-e2e/**/*.cy.{js,jsx,ts,tsx}',
        ],
        setupNodeEvents(on, config) {
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
                'log': (message: string) => {
                    console.log(message);
                    return null;
                },
            });
        },
    },
});
