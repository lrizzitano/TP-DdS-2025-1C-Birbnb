import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const CardNotificacion = ({ notificacion, marcarComoLeida }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          <span>{notificacion.fechaAlta}</span>
        </Typography>
        <Typography variant="body2">
          {notificacion.mensaje}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => marcarComoLeida(notificacion.id)}>
          Marcar como leída
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardNotificacion;