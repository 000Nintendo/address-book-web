import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from "@mui/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n/config";
import "./index.css";

import PersistedWrapper from "./PersistedWrapper";
import appoloClient from "./graphql/appolo";
import theme from "./utils/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <PersistedWrapper>
        <ApolloProvider client={appoloClient}>
          <App />
        </ApolloProvider>
        </PersistedWrapper>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
