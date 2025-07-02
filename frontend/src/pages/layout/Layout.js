import { Outlet } from "react-router";
import Header from "../../components/header/Header";
import './Layout.css';
import Footer from "../../components/footer/Footer";

const Layout = () => {
  return (
    <div className="contenedorLayout">
      <Header text="Frontend de Birbnb" />
      <main className="mainContent">
        <Outlet />
      </main>
      <Footer text="Footer de Birbnb" />
    </div>
  )
}

export default Layout;