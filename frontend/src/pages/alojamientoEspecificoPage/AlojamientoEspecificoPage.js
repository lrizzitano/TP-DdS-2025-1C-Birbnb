import { useParams } from "react-router-dom";
import { fetchAlojamiento } from "../../api/api";
import { useState, useEffect } from "react";
import './AlojamientoEspecificoPage.css'
import { Typography } from "@mui/material";
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
        <div className="contenedorAlojamiento">

          <div className="tituloAlojamiento">
            <Typography variant="h4" gutterBottom>
              {alojamiento.nombre}
            </Typography>
          </div>

          <div className="dataAlojamiento">

            <img src={alojamiento.fotos[0].path} width={"50%"} alt={alojamiento.nombre}></img>

            <div className="textoAlojamiento">
              <Typography variant="h5" component="h2" gutterBottom>
                Acerca de este lugar:
              </Typography>
              <Typography variant="h6" gutterBottom>
                {alojamiento.descripcion}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                Precio por noche: ${alojamiento.precioPorNoche}
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom>
                Capacidad: {alojamiento.cantHuespedesMax} personas
              </Typography>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default AlojamientoEspecificoPage; 