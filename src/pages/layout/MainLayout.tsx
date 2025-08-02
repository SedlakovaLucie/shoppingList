import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/navbar/Navbar";
import Footer from "../../components/shared/footer/Footer";

const MainLayout = () => (
  <div className="app-layout">
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;