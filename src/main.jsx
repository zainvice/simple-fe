import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from './api/store';
import './index.css';
import App from './App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);