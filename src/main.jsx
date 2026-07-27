import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Auth/AuthProvider.jsx";
import "./index.css";
import App from "./App.jsx";
import SnackbarProvider from "./Auth/SnackbarProvider.jsx";
import Layout from "./Components/Layout.jsx";
import { CartProvider } from "./Context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <AuthProvider>
        <SnackbarProvider>
          <BrowserRouter>
            <Layout>
              <CartProvider>
                <App />
              </CartProvider>
            </Layout>
          </BrowserRouter>
        </SnackbarProvider>
      </AuthProvider>
    </CartProvider>
  </StrictMode>,
);
