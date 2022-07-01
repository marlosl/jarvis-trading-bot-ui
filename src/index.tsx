import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import MainApp from './MainApp';
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
  </Provider>,  
  document.querySelector('#root'),
);