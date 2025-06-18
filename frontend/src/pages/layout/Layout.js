import { Outlet } from "react-router";
import Header from "../../components/header/Header";
import './Layout.css';

const Layout = () => {
    return(
        <div className = "contenedorLayout">
          <Header text = "Frontend de Birbnb" />
          <Outlet />
        </div>
    )
}

export default Layout;