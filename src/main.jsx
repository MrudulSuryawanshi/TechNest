import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SnackbarProvider from "./Components/Snackbar/SnackbarProvider";
import AuthProvider from "./Auth/AuthProvider";
import { CartProvider } from "./Context/CartContext";
import { SearchProvider } from "./Context/SearchContext";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./Theme/Theme";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <CartProvider>
            <SearchProvider>
              <BrowserRouter>
                <Layout>
                  <App />
                </Layout>
              </BrowserRouter>
            </SearchProvider>
          </CartProvider>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </StrictMode>,
);
