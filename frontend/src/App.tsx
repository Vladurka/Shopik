import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home-page/HomePage";
import { ProductsPage } from "./pages/products-page/ProductsPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import { AuthCallbackPage } from "./pages/auth-callback-page/AuthCallbackPage";
import { DetailsPage } from "./pages/details-page/DetailsPage";
import { CartPage } from "./pages/cart-page/CartPage";
import { SuccessPage } from "./pages/success-page/SuccessPage";
import { Toaster } from "react-hot-toast";
import { DashboardPage } from "./pages/dashboard-page/DashboardPage";
import { OrdersHistoryPage } from "./pages/history-page/OrdersHistoryPage";

export default function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<DetailsPage />} />
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<OrdersHistoryPage />} />
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  );
}
