import { useParams } from "react-router-dom";
import { fetchAlojamiento } from "../../api/api";
import { useState, useEffect } from "react";
import './AlojamientoEspecificoPage.css'
import { Link } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import PetsIcon from '@mui/icons-material/Pets';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Box, Typography, Button, Paper } from '@mui/material';

//medio poco elegante, pero no se me ocurrio otra forma de agregar los iconos
const caracteristicaIcons = {
  WIFI: <WifiIcon />,
  PILETA: <PoolIcon />,
  MASCOTAS_PERMITIDAS: <PetsIcon />,
  ESTACIONAMIENTO: <LocalParkingIcon />,
};

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

          <Paper elevation={3} sx={{ p: 3, width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

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
                  <Typography variant="h6" component="h2" gutterBottom>
                    Características:
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {alojamiento.caracteristicas.map((c, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {caracteristicaIcons[c] ?? '❓'}
                        <Typography variant="body2">{c.replaceAll("_", " ")}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 3, width: 'fit-content' }}
                    component={Link}
                    to={`/alojamientos/${alojamiento.id}/reservar`}
                  >
                    Reservar
                  </Button>

              </Box>
            </Paper>
          </div>

          
{alojamiento.direccion?.latitud && alojamiento.direccion?.longitud && (
  <>
    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
      Ubicación
    </Typography>

    <Typography variant="body1" gutterBottom>
      <LocationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
      {alojamiento.direccion.calle} {alojamiento.direccion.altura}, {alojamiento.direccion.ciudad.nombre}, {alojamiento.direccion.ciudad.pais.nombre}
    </Typography>

    <Box
      sx={{
        height: { xs: 180, sm: 220 },
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        mt: 2
      }}
    >
      <MapContainer
        center={[alojamiento.direccion.latitud, alojamiento.direccion.longitud]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[alojamiento.direccion.latitud, alojamiento.direccion.longitud]}>
          <Popup>
            {alojamiento.nombre}
          </Popup>
        </Marker>

      </MapContainer>
    </Box>
  </>
)}








        </div>
      )}
    </>
  )
};

export default AlojamientoEspecificoPage; 
