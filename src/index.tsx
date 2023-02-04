import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/js/all';
import { Provider } from 'react-redux';
import { store } from './shared/app/store';
import { BrowserRouter } from 'react-router-dom';
import BackofficeApplication from './backoffice/BackofficeApplication';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <BackofficeApplication />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
