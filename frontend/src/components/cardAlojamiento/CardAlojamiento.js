import './CardAlojamiento.css'
import { Link } from 'react-router-dom';

// aca arme una card a mano, hay que ponderar si queremos hacerlo asi o usar alguna
// biblioteca de componentes ya existente

const CardAlojamiento = ({alojamiento}) => {
    return (
        <div className="card">
            <Link to={`/alojamientos/${alojamiento.id}`}>
            {/* la foto esta hardcodeada, pq las fotos de la DB no son reales, habria q arreglarlas y aca poner alojamiento.fotos[0] */}
                <img src={"https://a0.muscache.com/im/pictures/c42d676c-4733-4151-9f40-c2903f4a3cd0.jpg?im_w=960"} alt={alojamiento.nombre} className="imagen"></img>
            </Link>
            <h4>{alojamiento.nombre}</h4>
            <p>{`Precio por noche: $${alojamiento.precioPorNoche}`}</p>
        </div>
    );
}


export default CardAlojamiento;