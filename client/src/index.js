import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@emotion/react";
import { customTheme } from "./styles/shared-styles";
import { AuthContextProvider } from "./context/auth-context"; // This is the context for the logged in state
import { AxiosContextProvider } from "./context/axios_context"; //Context of axios api object

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={customTheme}>
    <AxiosContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AxiosContextProvider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
