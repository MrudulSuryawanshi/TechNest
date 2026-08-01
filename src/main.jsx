import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SnackbarProvider from "./Components/Snackbar/SnackbarProvider";
import AuthProvider from "./Auth/AuthProvider";
import { CartProvider } from "./Context/CartContext";
import { SearchProvider } from "./Context/SearchContext";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
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
  </StrictMode>,
);
