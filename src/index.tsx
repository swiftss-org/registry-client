import React from 'react';

import { createRoot } from 'react-dom/client';

import './index.css';
import { setAxiosToken } from './api/axiosInstances';
import App from './App';
import { __TOKEN__ } from './utils/constants';
import { getUserStorageItem } from './utils/storage';

const token = getUserStorageItem(__TOKEN__);
if (token) {
  setAxiosToken(token);
}

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
