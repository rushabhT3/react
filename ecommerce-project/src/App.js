import React, { useContext, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { CartProvider } from "./contexts/CartContext";
import AuthContext from "./store/auth-context";

import RootLayout from "./pages/Root";
import Login from "./pages/Login";

const HomePage = lazy(() => import("./pages/Home"));
const StorePage = lazy(() => import("./pages/Store"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactUsPage = lazy(() => import("./pages/ContactUs"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetail"));

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedin = authCtx.isLoggedIn;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/home",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          ),
        },
        {
          path: "/",
          element: isLoggedin ? (
            <Navigate to="/store" replace />
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: "/store",
          element: isLoggedin ? (
            <Suspense fallback={<div>Loading...</div>}>
              <StorePage />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
          ),
          exact: true,
        },
        {
          path: "/about",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AboutPage />
            </Suspense>
          ),
        },
        {
          path: "/contactus",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <ContactUsPage />
            </Suspense>
          ),
        },
        {
          path: "/store/:productId",
          element: isLoggedin ? (
            <Suspense fallback={<div>Loading...</div>}>
              <ProductDetailPage />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
