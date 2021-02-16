import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import App from "./App";
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import rootReducer from './state/slices'

let store = configureStore({reducer:rootReducer})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
