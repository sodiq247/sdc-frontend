/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { WalletProvider } from "./Components/Wallet";
axios.interceptors.request.use(
  (request) => {
    request.headers.ContertType = "application/json";
    // request.headers["Content-Type"] = "application/json";
    request.headers.Accept = "application/json";
    if (request.url.includes("vas")) {
      request.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    response.data.statusCode = 200;
    return response.data;
  },
  (error) => {
    let type = typeof error.response.data;
    if (type === "string") {
      error.response.data = {
        statusCode: error.response.status,
        body: error.response.data,
      };
    } else {
      error.response.data.statusCode = error.response.status;
    }

    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      window.location.href = "/";
    }

    return error.response.data;
  }
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <App />
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
