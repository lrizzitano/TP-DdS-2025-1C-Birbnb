import { Card, CardContent, Typography } from '@mui/material';
import './CardReserva.css'; 

const CardReserva = ({ reserva }) => {
    const fechaInicio = new Date(reserva.rangoFechas.fechaInicio).toLocaleDateString();
    const fechaFin = new Date(reserva.rangoFechas.fechaFin).toLocaleDateString();
    const fechaAlta = new Date(reserva.fechaAlta).toLocaleDateString();

    return (
        <Card variant="outlined" sx={{ mb: 2, flexShrink: 0 }}>
            <CardContent className="contenedorReserva">

                <div className="infoReserva">
                    <Typography variant="h6" gutterBottom>
                        Reserva #{reserva.id.slice(0, 6).toUpperCase()}
                    </Typography>
                    <Typography variant="body2">Estado: <strong>{reserva.estado}</strong></Typography>
                    <Typography variant="body2">Fecha de alta: {fechaAlta}</Typography>
                    <Typography variant="body2">Rango de fechas: {fechaInicio} - {fechaFin}</Typography>
                    <Typography variant="body2">Cantidad de huéspedes: {reserva.cantidadHuespedes}</Typography>
                    <Typography variant="body2">Precio por noche: ${reserva.precioPorNoche}</Typography>
                </div>

                <div className="infoAlojamiento">
                    <img
                        src={reserva.alojamiento.fotos[0].path}
                        alt={reserva.alojamiento.fotos[0].descripcion}
                        className="imagenAlojamiento"
                    />
                    <Typography variant="body1" className="nombreAlojamiento">
                        <strong>{reserva.alojamiento.nombre}</strong>
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
export default CardReserva;