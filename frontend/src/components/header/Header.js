import { useState, useEffect } from "react";
import './Header.css';
import { Link } from "react-router-dom";
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../images/logo.png'
import DrawerNotificaciones from '../drawerNotificaciones/DrawerNotificaciones';
import ModalUsuario from '../modalUsuario/ModalUsuario';
import { fetchNotificacionesDeUsuarioBackend, MarcarComoLeidaBackend } from "../../api/api";



const Header = (props) => {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  // Datos de usuario de ejemplo
  const usuario = {
    id: "68367739102a6bf29a3d1ef0",
    nombre: "Leo Cesario",
    email: "lcesario@mail.com.ar",
    tipo: "HUESPED"
  };

  const cargarNotificaciones = () => {
    setLoading(true);
    fetchNotificacionesDeUsuarioBackend(usuario.id)
      .then(res => {
        setNotificaciones(res);
      })
      .catch((e) => {
        console.error("Error al cargar notificaciones", e);
      })
      .finally(() => setLoading(false));
  };


  useEffect(() => {
    cargarNotificaciones();
  }, []);

  const marcarComoLeida = (id) => {
    MarcarComoLeidaBackend(id)
      .then(() => {
        cargarNotificaciones(); // recarga lista actualizada
      })
      .catch((e) => {
        console.error("Error al marcar como leída", e);
      });
  }

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);


  return (
    <header className="header">
      <Link className="linkHome" to="/"><img src={logo} alt="Logo birbnb" className="logo" /></Link>

      <div style={{ flexGrow: 1 }}></div>

      <IconButton color="inherit" onClick={handleOpen}>
        <AccountCircleIcon />
      </IconButton>

      <ModalUsuario
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        usuario={usuario}
      />

      <IconButton onClick={toggleDrawer(true)} color="inherit">
        <Badge badgeContent={notificaciones.filter((n) => n.estado === "PENDIENTE").length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <DrawerNotificaciones
        openDrawer={openDrawer}
        closeDrawer={toggleDrawer(false)}
        listaNotificaciones={notificaciones}
        marcarComoLeida={marcarComoLeida}
      />

    </header>
  );
};

export default Header;