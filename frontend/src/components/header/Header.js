import { useState } from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { Drawer, IconButton, List, Divider, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../../images/logo.png'
import CardNotificacion from '../cardNotificacion/CardNotificacion';


const Header = (props) => {

  const [openDrawer, setOpenDrawer] = useState(false);

  const [notificaciones, setNotificaciones] = useState([{
    "id": "683764e6cb7c32307e0a2fb3",
    "mensaje": "Nueva reserva para el alojamiento Casa en la Playa\n      desde Sat Mar 31 2029 21:00:00 GMT-0300 (Argentina Standard Time)  \n      hasta Wed Apr 04 2029 21:00:00 GMT-0300 (Argentina Standard Time)\n      hecha por Ornella Mosca.",
    "fechaAlta": "2025-05-28T19:32:54.241Z",
    "estado": "PENDIENTE",
    "fechaLeida": null
  },
  {
    "id": "683764e6cb7c32307e0a2fd0",
    "mensaje": "La reserva para el alojamiento Casa en la Playa\n      desde Sat Mar 31 2029 21:00:00 GMT-0300 (Argentina Standard Time)\n      hasta Wed Apr 04 2029 21:00:00 GMT-0300 (Argentina Standard Time)\n      fue cancelada por Ornella Mosca\n      por el siguiente motivo: Sin motivo",
    "fechaAlta": "2025-05-28T19:32:54.350Z",
    "estado": "PENDIENTE",
    "fechaLeida": null
  },
  {
    "id": "68377dcc74bc812bae41d98e",
    "mensaje": "Nueva reserva para el alojamiento Casa en la Playa\n      desde Sat Mar 31 2029 21:00:00 GMT-0300 (Argentina Standard Time)  \n      hasta Wed Apr 04 2029 21:00:00 GMT-0300 (Argentina Standard Time)\n      hecha por Ornella Mosca.",
    "fechaAlta": "2025-05-28T21:19:08.431Z",
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


  return (
    <header className="header">
      <Link className="linkHome" to="/"><img src={logo} alt="Logo birbnb" className="logo" /></Link>

      <IconButton onClick={toggleDrawer(true)} color="inherit">
        <Badge badgeContent={notificaciones.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)} slotProps={{
        paper: {
          sx: {
            mt: '4rem',
            height: 'calc(100vh - 4rem)',
          }
        }
      }}>
        <div style={{ width: 350, padding: '16px' }}>
          <h3>Notificaciones</h3>
          <Divider />
          <List className='listaNotificaciones'>
            {notificaciones.map((notif) => (
              <CardNotificacion
                key={notif.id}
                notificacion={notif}
                marcarComoLeida={eliminarNotificacion}
              />
            ))}
          </List>
        </div>
      </Drawer>

    </header>
  );
};

export default Header;