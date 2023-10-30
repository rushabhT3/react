import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import StorePage from "./pages/Store";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { CartProvider } from "./contexts/CartContext";
import ContactUsPage from "./pages/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/", element: <StorePage /> },
      { path: "/store", element: <StorePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contactus", element: <ContactUsPage /> },
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
