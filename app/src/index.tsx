import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline } from "@mui/material";
import { styled } from "@mui/system";
import "./services/i18n";

const RootContainer = styled("div")({
  height: "100vh",
  display: "flex",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline>
      <RootContainer>
        <App />
      </RootContainer>
    </CssBaseline>
  </React.StrictMode>
);
