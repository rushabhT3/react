import { Outlet } from "react-router-dom";
// import MainNavigation from "../components/MainNavigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

// sfc
const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
