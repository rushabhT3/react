import { useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { CartProvider } from "./contexts/CartContext";
import AuthContext from "./store/auth-context";

import StorePage from "./pages/Store";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import ContactUsPage from "./pages/ContactUs";
import ProductDetailPage from "./pages/ProductDetail";
import Login from "./pages/Login";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedin = authCtx.isLoggedIn;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/home", element: <HomePage /> },
        // navigate in V6; redirect in V5
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
            <StorePage />
          ) : (
            <Navigate to="/login" replace />
          ),
          exact: true,
        },
        { path: "/about", element: <AboutPage /> },
        { path: "/contactus", element: <ContactUsPage /> },
        {
          path: "/store/:productId",
          element: isLoggedin ? (
            <ProductDetailPage />
          ) : (
            <Navigate to="/login" replace />
          ),
        },
        { path: "/login", element: <Login /> },
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
