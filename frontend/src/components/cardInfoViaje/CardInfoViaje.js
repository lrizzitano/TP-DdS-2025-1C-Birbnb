import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {Box, Card, CardContent, Typography, Button, CircularProgress,Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import DropdownHuespedes from "../dropdownHuespedes/DropdownHuespedes";
import { FiltroRangoFechas } from "../filtroRangoFechas/FiltroRangoFechas";
import { fetchAlojamiento } from "../../api/api";
import { crearReservaBackend } from "../../api/api";
import { useNavigate } from "react-router-dom";

// Funciones auxiliares para valores por defecto
const hoy = () => new Date().toLocaleDateString("en-US");

const CardInfoViaje = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);

  const [datosReserva, setDatosReserva] = useState({
    fechaInicio: hoy(),
    fechaFin: hoy(),
    cantHuespedes: 1,
  });

  const [modalExito, setModalExito] = useState(false);
  const [modalError, setModalError] = useState(false);

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

  const noches = Math.max(Math.floor(Math.abs(
    (new Date(datosReserva.fechaFin) - new Date(datosReserva.fechaInicio)) / (1000 * 60 * 60 * 24)
  )), 1);
  const precioTotal = noches * alojamiento.precioPorNoche;

  const handleConfirmarReserva = async () => {
    try {
      const reserva = {
        alojamientoId: alojamiento.id,
        usuarioId: "6835f4add17340a15cb50737", // ulises hardcodeado 
        rangoFechas: {
          fechaInicio: new Date(datosReserva.fechaInicio),
          fechaFin: new Date(datosReserva.fechaFin)
        },
        cantidadHuespedes: datosReserva.cantHuespedes
      };

      const resultado = await crearReservaBackend(reserva);

      if (resultado !== -1) {
        setModalExito(true);
      } else {
        setModalError(true);
      }
    } catch (error) {
      console.error("POST falló:", error);
    }
  };

  return (
    <Card sx={{ flex: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          2. Agregá la información del viaje
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
        

        {/* Modal de Éxito */}
        <Dialog open={modalExito} onClose={() => setModalExito(false)}>
          <DialogTitle>✅ ¡Reserva confirmada!</DialogTitle>
          <DialogContent>
            Tu reserva fue realizada con éxito
          </DialogContent>
          <DialogActions>
              <Button onClick={() => {
                setModalExito(false);
                navigate(`/reservas/6835f4add17340a15cb50737`);
              }}>
              Ir a mis reservas
              </Button>
          </DialogActions>
        </Dialog>

        {/* Modal de Error */}
        <Dialog open={modalError} onClose={() => setModalError(false)}>
          <DialogTitle>❌ Error</DialogTitle>
          <DialogContent>
            La reserva no se encuentra disponible en las fechas seleccionadas.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalError(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>



      </CardContent>
    </Card>
  );
};

export default CardInfoViaje;
