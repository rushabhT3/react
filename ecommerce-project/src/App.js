import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import "./App.css";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./store/auth-context";

import StorePage from "./pages/Store";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import ContactUsPage from "./pages/ContactUs";
import ProductDetailPage from "./pages/ProductDetail";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/home", element: <HomePage /> },
      // navigate in V6; redirect in V5
      { path: "/", element: <Navigate to="/store" replace /> },
      { path: "/store", element: <StorePage />, exact: true },
      { path: "/about", element: <AboutPage /> },
      { path: "/contactus", element: <ContactUsPage /> },
      {
        path: "/store/:productId",
        element: <ProductDetailPage />,
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
