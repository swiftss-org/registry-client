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
// Note: Cypress.env() is disabled in this repo (allowCypressEnv=false),
// so we use an in-module buffer.
const __browserErrors__: string[] = [];

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

  __browserErrors__.push(`${prefix} ${message}`);
};

// Sanity marker so CI logs prove this support file is loaded.
beforeEach(() => {
  cy.task('log', 'CI DEBUG - Cypress support diagnostics active', { log: false });
});

Cypress.on('window:before:load', (win) => {
  // Instrument storage writes so we can see if the app ever tries to persist the token.
  const instrumentStorage = (storage: Storage, label: 'localStorage' | 'sessionStorage') => {
    const origSetItem = storage.setItem.bind(storage);
    const origRemoveItem = storage.removeItem.bind(storage);
    const origClear = storage.clear.bind(storage);

    storage.setItem = (key: string, value: string) => {
      pushBufferedError('STORAGE setItem:', { storage: label, key, valuePreview: String(value).slice(0, 12) });
      return origSetItem(key, value);
    };
    storage.removeItem = (key: string) => {
      pushBufferedError('STORAGE removeItem:', { storage: label, key });
      return origRemoveItem(key);
    };
    storage.clear = () => {
      pushBufferedError('STORAGE clear:', { storage: label });
      return origClear();
    };
  };

  try {
    instrumentStorage(win.localStorage, 'localStorage');
    instrumentStorage(win.sessionStorage, 'sessionStorage');
  } catch (e) {
    pushBufferedError('STORAGE instrumentation failed:', e);
  }

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

afterEach(() => {
  if (__browserErrors__.length) {
    cy.task('log', '--- Buffered browser errors (for CI) ---', { log: false });
    for (const line of __browserErrors__) {
      cy.task('log', line, { log: false });
    }
    cy.task('log', '--- End buffered browser errors ---', { log: false });
    __browserErrors__.length = 0;
  }
});

Cypress.on('fail', (err) => {
  if (__browserErrors__.length) {
    cy.task('log', '--- Buffered browser errors (for CI) ---', { log: false });
    for (const line of __browserErrors__) {
      cy.task('log', line, { log: false });
    }
    cy.task('log', '--- End buffered browser errors ---', { log: false });
    __browserErrors__.length = 0;
  }
  throw err;
});
