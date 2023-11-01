import {
  createBrowserRouter,
  RouterProvider,
  Switch,
  Navigate,
} from "react-router-dom";

import "./App.css";
import StorePage from "./pages/Store";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { CartProvider } from "./contexts/CartContext";
import ContactUsPage from "./pages/ContactUs";
import ProductDetailPage from "./pages/ProductDetail";

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
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
