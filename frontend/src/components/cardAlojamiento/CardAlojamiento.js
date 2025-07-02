import './CardAlojamiento.css'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';



const CardAlojamiento = ({ alojamiento }) => {
    return (
        <Card sx={{ width: 400, height: 315, display: 'flex', flexDirection: 'column' }}>
            <CardActionArea component={Link}
                to={`/alojamientos/${alojamiento.id}`}
                target="_blank"
                sx={{ height: '100%', flexGrow: 1 }}>
                <CardMedia
                    component="img"
                    height="225"
                    image={alojamiento.fotos[0].path}
                    alt={alojamiento.fotos[0].descripcion}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {alojamiento.nombre}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`Precio por noche: $${alojamiento.precioPorNoche}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}


export default CardAlojamiento;