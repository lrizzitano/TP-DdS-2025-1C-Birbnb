import { useState, useEffect } from "react";
import { Typography } from '@mui/material';
import CardUsuario from '../../components/cardUsuario/CardUsuario';
import CardReserva from '../../components/cardReserva/CardReserva';
import { fetchReservasDeUsuarioBackend } from "../../api/api";

import './ReservasPage.css';
import BotonVolver from "../../components/botonVolver/BotonVolver";

const HuespedPage = () => {

  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  const usuario = {
    id: "68367739102a6bf29a3d1ef0",
    nombre: "Leo Cesario",
    email: "lcesario@mail.com.ar",
    tipo: "HUESPED"
  };

  useEffect(() => {
    setLoading(true);
    fetchReservasDeUsuarioBackend(usuario.id)
      .then(res => {
        console.log("Respuesta del backend:", res);
        setReservas(res);
      })
      .catch((e) => {
        console.error("Error al traer reservas:", e);
      })
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="pageHuesped">
      <BotonVolver />
      <div className="columnaUsuario">
        <CardUsuario usuario={usuario} />
      </div>

      {loading ? (
        <p>Cargando alojamientos...</p>
      ) : (
        <div className="columnaReservas">
          <Typography variant="h5" gutterBottom>
            Reservas Activas:
          </Typography>
          {reservas.map((reserva) => (
            <CardReserva key={reserva.id} reserva={reserva} />
          ))}
        </div>
      )}

    </div>
  );
};

export default HuespedPage;
