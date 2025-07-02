import { useState, useEffect } from "react";
import CardUsuario from '../../components/cardUsuario/CardUsuario';
import ListaReservas from '../../components/listaReservas/ListaReservas';
import { fetchReservasDeUsuarioBackend } from "../../api/api";

import './ReservasPage.css';
import BotonVolver from "../../components/botonVolver/BotonVolver";

const HuespedPage = () => {

  console.log("Renderizando HuespedPage");


  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);

  const usuario = {
    id: "68367739102a6bf29a3d1ef0",
    nombre: "Leo Cesario",
    email: "lcesario@mail.com.ar",
    tipo: "HUESPED"
  };

  useEffect(() => {
    console.log("Cargando reservas de usuario:", usuario.id);
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


  { console.log("Reservas:", reservas) }

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
            reservas={reservas.filter(reserva => reserva.huespedReservadorId != usuario.id)}
          />

        </div>

      )}

    </div>
  );
};

export default HuespedPage;
