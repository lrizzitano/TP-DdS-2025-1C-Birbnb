import { useParams } from "react-router-dom";
import { fetchAlojamiento } from "../../api/api";
import { useState, useEffect } from "react";
import './AlojamientoEspecificoPage.css'
const AlojamientoEspecificoPage = () => {
    const { id } = useParams(); //sacamos el id de la url (parte de react router, lo saque de clases sabado)

    const [alojamiento, setAlojamiento] = useState(0);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        setLoading(true);
        fetchAlojamiento(id).then(a => {
          setAlojamiento(a);
        })
          .then(() => setLoading(false))
          .catch(() => setLoading(false))
      }, [id]);

    // seria la verificacion de no encontrarlo
    if (!alojamiento) return <div>Producto no encontrado</div>;

    return (
    <>
      {loading ? (
        <p>Cargando alojamientos...</p>
      ) : (
        <div className = "contenedorAlojamiento">
          <h2>{alojamiento.nombre}</h2>
          <img src={alojamiento.fotos[0].path} width={"50%"} alt={alojamiento.nombre}></img>
          <h3>Acerca de este lugar</h3>
          <p>{alojamiento.descripcion}</p>
        </div>
      )}
    </>
    )
};

export default AlojamientoEspecificoPage; 