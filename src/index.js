import React from 'react';
import ReactDOM from 'react-dom';
import './extra/index.css';
import App from './App';
import '@fontsource/roboto';
import {FiltersContextProvider} from "./Context/FiltersContext";
ReactDOM.render(
  <React.StrictMode>
      <FiltersContextProvider>
          <App />
      </FiltersContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);