import { useState, useEffect } from "react";
import CardUsuario from '../../components/cardUsuario/CardUsuario';
import ListaReservas from '../../components/listaReservas/ListaReservas';
import { aceptarReservaBackend, fetchReservasDeUsuarioBackend } from "../../api/api";

import './ReservasPage.css';
import BotonVolver from "../../components/botonVolver/BotonVolver";

const HuespedPage = () => {

  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  const usuario = {
    id: "68367739102a6bf29a3d1ef0",
    nombre: "Leo Cesario",
    email: "lcesario@mail.com.ar",
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
      </div>

      {loading ? (
        <p>Cargando reservas...</p>
      ) : (
        <div className="columnaReservas">
          <ListaReservas
            titulo="Mis Reservas"
            reservas={reservas.filter(reserva => reserva.huespedReservadorId === usuario.id)}
          />
          <ListaReservas
            titulo="Reservas de Mis Alojamientos"
            reservas={reservas.filter(reserva => reserva.huespedReservadorId !== usuario.id).reverse()} botonAceptar = {true} funcionOnClick={funcionOnClick} 
          />
        </div>

      )}

    </div>
  );
};

export default HuespedPage;
