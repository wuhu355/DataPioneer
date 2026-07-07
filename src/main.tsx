import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// 🎨 暗夜数据美学
import './themes/dark-data-aesthetics.css';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error(
    'Failed to find the root element. Make sure <div id="root"></div> exists in index.html',
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
