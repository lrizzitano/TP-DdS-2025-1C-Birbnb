import { useState, useEffect } from "react";
import CardUsuario from '../../components/cardUsuario/CardUsuario';
import ListaReservas from '../../components/listaReservas/ListaReservas';
import { aceptarReservaBackend, fetchReservasDeUsuarioBackend } from "../../api/api";
import { Button, CircularProgress } from "@mui/material";

import './ReservasPage.css';
import BotonVolver from "../../components/botonVolver/BotonVolver";

import { useNavigate } from "react-router-dom";

const HuespedPage = () => {
  
  const navigate = useNavigate();

  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  const usuario = {
    id: "6835f4add17340a15cb50737",
    tipo: 0, // 0 = anfitrión, 1 = huésped
    nombre: "Ulises Magna",
    email: "umagnarelli@frba.utn.edu.ar",
  };
  const traerReservas = () => {
    setLoading(true);
    fetchReservasDeUsuarioBackend(usuario.id)
      .then(res => {
        setReservas(res);
      })
      .catch((e) => {
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => traerReservas(), []);

  async function funcionOnClick(idReserva) {
    const res = await aceptarReservaBackend(idReserva);
    traerReservas()
  }

  return (
    <div className="pageHuesped">
      <BotonVolver />
      <div className="columnaUsuario">

        <CardUsuario usuario={usuario} />

        {usuario.tipo === 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/agregar-alojamiento")}
            style={{ marginTop: "1rem" }}
          >
            Agregar Alojamiento
          </Button>
        )}
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className="columnaReservas">
          <ListaReservas
            titulo="Mis Reservas"
            reservas={reservas.filter(reserva => reserva.huespedReservadorId === usuario.id).reverse()}
          />
          <ListaReservas
            titulo="Reservas de Mis Alojamientos"
            reservas={reservas.filter(reserva => reserva.alojamiento.anfitrion.id === usuario.id).reverse()} botonAceptar = {true} funcionOnClick={funcionOnClick} 
          />
        </div>

      )}

    </div>
  );
};

export default HuespedPage;
