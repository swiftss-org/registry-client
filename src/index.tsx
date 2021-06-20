import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { setAxiosToken } from './api/axiosInstances';
import { getUserStorageItem } from './utils/storage';
import { __TOKEN__ } from './utils/constants';

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
