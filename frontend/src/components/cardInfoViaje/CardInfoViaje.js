import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import DropdownHuespedes from "../dropdownHuespedes/DropdownHuespedes";
import { FiltroRangoFechas } from "../filtroRangoFechas/FiltroRangoFechas";
import { fetchAlojamiento } from "../../api/api";

// Funciones auxiliares para valores por defecto
const hoy = () => new Date().toISOString().split("T")[0];
const manana = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const CardPagoReserva = () => {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);

  const [datosReserva, setDatosReserva] = useState({
    fechaInicio: hoy(),
    fechaFin: manana(),
    cantHuespedes: 1,
  });

  const actualizarDato = (campo, valor) => {
    setDatosReserva((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  useEffect(() => {
    fetchAlojamiento(id)
      .then((a) => setAlojamiento(a))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Card sx={{ flex: 2 }}>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (!alojamiento) {
    return (
      <Card sx={{ flex: 2 }}>
        <CardContent>
          <Typography>No se encontró el alojamiento.</Typography>
        </CardContent>
      </Card>
    );
  }

  const noches = Math.max(
    (new Date(datosReserva.fechaFin) - new Date(datosReserva.fechaInicio)) / (1000 * 60 * 60 * 24),
    1
  );
  const precioTotal = noches * alojamiento.precioPorNoche;

  const handleConfirmarReserva = () => {
    const reserva = {
      alojamiento: alojamiento.id,
      huesped: "usuario123", // USER DE PRUEBITA JEJE
      rangoFechas: {
        fechaInicio: datosReserva.fechaInicio,
        fechaFin: datosReserva.fechaFin,
      },
      cantidadHuespedes: datosReserva.cantHuespedes,
      precioTotal,
    };

    console.log("Reserva a enviar:", reserva);
  };

  return (
    <Card sx={{ flex: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          1. Agregá la información del viaje
        </Typography>

        <DropdownHuespedes
          campo="cantHuespedes"
          setter={actualizarDato}
          max={alojamiento.cantHuespedesMax}
        />

        <FiltroRangoFechas
          setter={actualizarDato}
          fechaInicio={datosReserva.fechaInicio}
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Total por {noches} noche{noches > 1 ? "s" : ""}: ${precioTotal}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleConfirmarReserva}
        >
          Confirmar Reserva
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardPagoReserva;
