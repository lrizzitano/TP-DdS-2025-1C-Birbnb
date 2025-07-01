import { useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../images/logo.png'
import DrawerNotificaciones from '../drawerNotificaciones/DrawerNotificaciones';
import ModalUsuario from '../modalUsuario/ModalUsuario';


const Header = (props) => {

  const [openDrawer, setOpenDrawer] = useState(false);

  // Notifcaciones de ejemplo
  const [notificaciones, setNotificaciones] = useState([{
    "id": "683764e6cb7c32307e0a2fb3",
    "mensaje": "Nueva reserva para el alojamiento Casa en la Playa\n desde 31-03-2029  \n hasta 04-04-2029\n hecha por Ornella Mosca.",
    "fechaAlta": "2025-05-28",
    "estado": "PENDIENTE",
    "fechaLeida": null
  },
  {
    "id": "683764e6cb7c32307e0a2fd0",
    "mensaje": "La reserva para el alojamiento Casa en la Playa\n desde 31-03-2029\n hasta 04-04-2029\n fue cancelada por Ornella Mosca\n por el siguiente motivo: Sin motivo",
    "fechaAlta": "2025-05-28",
    "estado": "PENDIENTE",
    "fechaLeida": null
  },
  {
    "id": "68377dcc74bc812bae41d98e",
    "mensaje": "Nueva reserva para el alojamiento Casa en la Playa\n desde 31-03-2029  \n hasta 04-04-2029\n hecha por Ornella Mosca.",
    "fechaAlta": "2025-05-28",
    "estado": "PENDIENTE",
    "fechaLeida": null
  }
  ]);

  const eliminarNotificacion = (id) => {
    setNotificaciones(notificaciones.filter(n => n.id !== id));
  }

  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  // Datos de usuario de ejemplo
  const usuario = {
    id: "68367739102a6bf29a3d1ef0",
    nombre: "Leo Cesario",
    email: "lcesario@mail.com.ar",
    tipo: "HUESPED"
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
        <Badge badgeContent={notificaciones.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <DrawerNotificaciones
        openDrawer={openDrawer}
        closeDrawer={toggleDrawer(false)}
        listaNotificaciones={notificaciones}
        eliminarNotificacion={eliminarNotificacion}
      />

    </header>
  );
};

export default Header;