import React from 'react';

import ReactDOM from 'react-dom';

import './index.css';
import { setAxiosToken } from './api/axiosInstances';
import App from './App';
import { __TOKEN__ } from './utils/constants';
import { getUserStorageItem } from './utils/storage';

const token = getUserStorageItem(__TOKEN__);
if (token) {
  setAxiosToken(token);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
