import { Outlet } from "react-router";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import './Layout.css';

const Layout = () => {
    return(
        <div className = "contenedorLayout">
          <Header text = "Frontend de Birbnb" />
          <Outlet />
          <Footer text = "Footer de Birbnb" />
        </div>
    )
}

export default Layout;