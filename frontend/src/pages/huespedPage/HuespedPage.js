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
    alojamiento: {
      id: "6835f4cfe3a15cf7e8ffa805",
      nombre: "Casa en la Playa",
      fotos: [
        {
          "descripcion": "Vista al mar desde el balcón",
          "path": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.adsttc.com%2Fmedia%2Fimages%2F54ee%2Fabf8%2Fe58e%2Fce7e%2F1000%2F0060%2Flarge_jpg%2FE03.jpg%3F1424927721&f=1&nofb=1&ipt=acbed40e3d8e55c9ba275085f73aa383bc40baccc62a1c7db9c98cca845e8998"
        }
      ]
    },
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
    alojamiento: {
      nombre: "Cabaña en la Montaña",
      fotos: [
        {
          "descripcion": "Exterior nevado en invierno",
          "path": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.decoist.com%2Fwp-content%2Fuploads%2F2017%2F05%2FDark-wooden-cottage-stands-out-among-the-green-and-gray-backdrop-.jpeg&f=1&nofb=1&ipt=1594285dda797232b32e4743376a39faa5c74454cee38a1ff8b3ac27fe6e89b6"
        }
      ]

    },
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
