// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Buffer browser-side errors so we can print them on test failure.
// Calling cy.task directly from global event handlers can be flaky because it may fire
// outside an active Cypress command chain.
const pushBufferedError = (prefix: string, payload: unknown) => {
  const safeStringify = (value: unknown) => {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  };

  const message =
    typeof payload === 'string'
      ? payload
      : payload instanceof Error
        ? `${payload.name}: ${payload.message}\n${payload.stack ?? ''}`
        : safeStringify(payload);

  const existing = (Cypress.env('__browserErrors') as string[] | undefined) ?? [];
  existing.push(`${prefix} ${message}`);
  Cypress.env('__browserErrors', existing);
};

Cypress.on('window:before:load', (win) => {
  win.addEventListener('error', (event) => {
    pushBufferedError('BROWSER error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
        ? { name: event.error.name, message: event.error.message, stack: event.error.stack }
        : null,
    });
  });

  win.addEventListener('unhandledrejection', (event) => {
    const reason = (event as PromiseRejectionEvent).reason;
    pushBufferedError('BROWSER unhandledrejection:', reason);
  });

  const origError = win.console.error.bind(win.console);
  win.console.error = (...args) => {
    try {
      pushBufferedError('BROWSER console.error:', args);
    } catch {
      // ignore logging failures
    }
    origError(...args);
  };
});

Cypress.on('uncaught:exception', (err) => {
  pushBufferedError('CYPRESS uncaught:exception:', err);
  return false;
});

Cypress.on('fail', (err) => {
  const buffered = (Cypress.env('__browserErrors') as string[] | undefined) ?? [];
  if (buffered.length) {
    // eslint-disable-next-line no-console
    console.log('--- Buffered browser errors (for CI) ---');
    for (const line of buffered) {
      // eslint-disable-next-line no-console
      console.log(line);
    }
    // eslint-disable-next-line no-console
    console.log('--- End buffered browser errors ---');
  }
  throw err;
});
