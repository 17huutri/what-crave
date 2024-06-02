import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import "./index.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />

      <App />
    </Provider>
  </React.StrictMode>
);
