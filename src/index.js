import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Buyers from "./Buyers";
import reportWebVitals from "./reportWebVitals";
import NavigationBar from "./NavigationBar";
import NavigationBarSellers from "./NavigationBarSellers";
import Sellers from "./Sellers";
import reducers from "./reducers";
import { provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
