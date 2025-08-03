import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/navbar/Navbar";
import Footer from "../../components/shared/footer/Footer";
import "./MainLayout.css";

const MainLayout = () => (
  <div className="main-layout">
    <Navbar />
    <main>
      <div className="main-content">
        <Outlet />
      </div>
    </main>
    <Footer />
  </div>
);

export default MainLayout;