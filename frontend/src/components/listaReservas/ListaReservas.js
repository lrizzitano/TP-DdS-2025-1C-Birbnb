import { useState } from 'react';
import Card from '@mui/material/Card';
import CardReserva from '../cardReserva/CardReserva';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './ListaReservas.css';

const ListaReservas = ({ titulo, reservas, botonAceptar, funcionOnClick }) => {
    const [abierto, setAbierto] = useState(false);

    if (!reservas || reservas.length === 0) return null;

    const toggleAbierto = () => setAbierto(prev => !prev);

    return (
        <div className="listaReservas">
            <Card sx={{ }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    onClick={toggleAbierto}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                    {titulo} {abierto ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Typography>
            </Card>
            <div className='reservasContainer'>
            {abierto && reservas.map(reserva => (
                <CardReserva key={reserva.id} reserva={reserva} botonAceptar={botonAceptar} funcionOnClick={funcionOnClick}/>
            ))}
            </div>
        </div>
    );
};

export default ListaReservas;