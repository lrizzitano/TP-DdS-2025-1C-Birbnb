import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAlojamiento } from "../../api/api";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  CircularProgress,
  Box
} from "@mui/material";

const CardResumenReserva = () => {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlojamiento(id)
      .then((a) => setAlojamiento(a))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Card sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (!alojamiento) {
    return (
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography>No se encontró el alojamiento.</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="160"
        image={alojamiento.fotos[0]?.path}
        alt={alojamiento.fotos[0]?.descripcion}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6">{alojamiento.nombre}</Typography>
        <Typography variant="body2" color="text.secondary">
          {alojamiento.descripcion}
        </Typography>
        

        <Divider sx={{ my: 2 }} />

        <Typography variant="body2">Capacidad: {alojamiento.cantHuespedesMax} personas</Typography>
        <Typography variant="body2">Precio por noche: ${alojamiento.precioPorNoche}</Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>Características:</strong> {alojamiento.caracteristicas.join(", ")}
        </Typography>

        {alojamiento.direccion && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" gutterBottom>
              📍 {alojamiento.direccion.calle} {alojamiento.direccion.altura},{" "}
              {alojamiento.direccion.ciudad.nombre}, {alojamiento.direccion.ciudad.pais.nombre}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CardResumenReserva;
