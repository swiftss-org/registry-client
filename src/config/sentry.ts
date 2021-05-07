import * as dotenv from 'dotenv';
import { Integrations } from '@sentry/tracing';

dotenv.config();
const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;

export const SENTRY_CONFIG = {
  environment: !process.env.REACT_APP_STAGE ? 'development' : process.env.REACT_APP_STAGE,
  dsn: SENTRY_DSN,
  release:
    process.env.NODE_ENV === 'production' && process.env.REACT_APP_SENTRY_RELEASE
      ? process.env.REACT_APP_SENTRY_RELEASE
      : undefined,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
};
