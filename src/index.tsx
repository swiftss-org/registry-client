import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from '@sentry/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SENTRY_CONFIG } from './config/sentry';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Sentry.init(SENTRY_CONFIG);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
