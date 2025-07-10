import { Card, CardContent, Typography, Button } from '@mui/material';
import { aceptarReservaBackend } from '../../api/api';
import './CardReserva.css'; 

const CardReserva = ({ reserva, botonAceptar, funcionOnClick }) => {
    const fechaInicio = new Date(reserva.rangoFechas.fechaInicio).toLocaleDateString();
    const fechaFin = new Date(reserva.rangoFechas.fechaFin).toLocaleDateString();
    const fechaAlta = new Date(reserva.fechaAlta).toLocaleDateString();

    return (
        <Card variant="outlined" sx={{ mb: 2, flexShrink: 0 }}>
            <CardContent className="contenedorReserva">

                <div className="infoReserva">
                    <Typography variant="h6" gutterBottom>
                        Reserva #{reserva.id.toUpperCase()}
                    </Typography>
                    {botonAceptar &&
                    <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={reserva.estado !== 'PENDIENTE' || new Date(reserva.rangoFechas.fechaInicio) < new Date()}
                    onClick={() => funcionOnClick(reserva.id) }
                    sx={{
                      borderRadius: '8px',
                      padding: '12px 24px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                        transform: 'translateY(-1px)'
                      },
                      '&:active': {
                        transform: 'translateY(0)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Aceptar
                  </Button>}
                    
                    
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