import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Divider } from '@mui/material';
import CardUsuario from '../../components/cardUsuario/CardUsuario';
import CardReserva from '../../components/cardReserva/CardReserva';
import './HuespedPage.css';

const reservasEjemplo = [
  {
    id: "683764dccb7c32307e0a2f6a",
    fechaAlta: "Wed May 28 2025 16:32:44 GMT-0300 (Argentina Standard Time)",
    huespedReservadorId: "68367739102a6bf29a3d1ef0",
    cantidadHuespedes: 4,
    alojamientoId: "6835f4cfe3a15cf7e8ffa806",
    rangoFechas: {
      fechaInicio: "Sat Mar 31 2029 21:00:00 GMT-0300 (Argentina Standard Time)",
      fechaFin: "Wed Apr 04 2029 21:00:00 GMT-0300 (Argentina Standard Time)"
    },
    estado: "CONFIRMADA",
    precioPorNoche: 80,
    historialDeCambios: []
  },
  {
    id: "683782d574bc812bae41da1a",
    fechaAlta: "Wed May 28 2025 18:40:37 GMT-0300 (Argentina Standard Time)",
    huespedReservadorId: "68367739102a6bf29a3d1ef0",
    cantidadHuespedes: 3,
    alojamientoId: "6835f4cfe3a15cf7e8ffa806",
    rangoFechas: {
      fechaInicio: "Sat Mar 31 2029 21:00:00 GMT-0300 (Argentina Standard Time)",
      fechaFin: "Wed Apr 04 2029 21:00:00 GMT-0300 (Argentina Standard Time)"
    },
    estado: "CONFIRMADA",
    precioPorNoche: 80,
    historialDeCambios: []
  }
];


const usuarioEjemplo = {
  id: "68367724102a6bf29a3d1eee",
  nombre: "Leo Cesario",
  email: "lcesario@mail.com.ar",
  tipo: "HUESPED"
};

const HuespedPage = () => {
  return (
    <div className="pageHuesped">
      <div className="columnaUsuario">
        <CardUsuario usuario={usuarioEjemplo} />
      </div>

      <div className="columnaReservas">
        <Typography variant="h5" gutterBottom>
          Reservas Activas:
        </Typography>
        {reservasEjemplo.map((reserva) => (
          <CardReserva key={reserva.id} reserva={reserva} />
        ))}
      </div>
    </div>
  );
};

export default HuespedPage;
