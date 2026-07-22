import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Auth/AuthProvider.jsx";
import "./index.css";
import App from "./App.jsx";
import SnackbarProvider from "./Auth/SnackbarProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </AuthProvider>
  </StrictMode>,
);
