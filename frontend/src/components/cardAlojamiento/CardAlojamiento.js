import './CardAlojamiento.css'
import { Link } from 'react-router-dom';

// aca arme una card a mano, hay que ponderar si queremos hacerlo asi o usar alguna
// biblioteca de componentes ya existente

const CardAlojamiento = ({alojamiento}) => {
    return (
        <div className="card">
            <Link to={`/alojamientos/${alojamiento.id}`}>
                <img src={alojamiento.fotos[0]} alt={alojamiento.nombre} className="imagen"></img>
            </Link>
            <h4>{alojamiento.nombre}</h4>
            <p>{`Precio por noche: $${alojamiento.precioPorNoche}`}</p>
        </div>
    );
}


export default CardAlojamiento;