import { useParams } from "react-router-dom";
import { fetchAlojamiento } from "../../api/api";
import { useState, useEffect } from "react";
import './AlojamientoEspecificoPage.css'
import { Link } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import PetsIcon from '@mui/icons-material/Pets';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import SliderFotosAlojamiento from "../../components/sliderFotosAlojamiento/SliderFotosAlojamiento";

//medio poco elegante, pero no se me ocurrio otra forma de agregar los iconos
const caracteristicaIcons = {
  WIFI: <WifiIcon />,
  PILETA: <PoolIcon />,
  MASCOTAS_PERMITIDAS: <PetsIcon />,
  ESTACIONAMIENTO: <LocalParkingIcon />,
};

// este es icono para el mapa, leaflet
const redDotIcon = divIcon({
  className: 'google-maps-icon',
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 40" width="24" height="40">
      <path fill="#EA4335" d="M12 0C6.48 0 2 4.48 2 10c0 5.08 8.45 16.24 9.71 17.72.19.22.52.22.71 0C13.55 26.24 22 15.08 22 10 22 4.48 17.52 0 12 0z"/>
      <path fill="#FFFFFF" d="M12 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
    </svg>
  `,
  iconSize: [24, 40],
  iconAnchor: [12, 40],
  popupAnchor: [0, -40]
});

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

  return (
    <>
      {loading ? (
        <div className="circuloCarga">
          <CircularProgress />
        </div>
      
      ) : (
        <div className="contenedorAlojamiento">

          <div className="tituloAlojamiento">
            <Typography variant="h4" gutterBottom>
              {alojamiento.nombre}
            </Typography>
          </div>

          <div className="dataAlojamiento">

          <SliderFotosAlojamiento fotos={alojamiento.fotos} />

          <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  width: '100%',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Sección Título */}
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <span>🏠</span> Acerca de este alojamiento
                  </Typography>
                  
                  {/* Descripción */}
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      lineHeight: 1.6,
                      color: 'text.secondary'
                    }}
                  >
                    {alojamiento.descripcion}
                  </Typography>
                  
                  {/* Precio */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1,
                    p: 2,
                    bgcolor: 'action.hover',
                    borderRadius: 2
                  }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Precio por noche:
                    </Typography>
                    <Typography 
                      variant="h6" 
                      color="error.main"
                      fontWeight="bold"
                    >
                      ${alojamiento.precioPorNoche}
                    </Typography>
                  </Box>
                  
                  {/* Capacidad */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1.5,
                    py: 1
                  }}>
                    <Typography variant="body1" color="text.secondary">
                      👥 Capacidad:
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {alojamiento.cantHuespedesMax} {alojamiento.cantHuespedesMax > 1 ? 'personas' : 'persona'}
                    </Typography>
                  </Box>
                  
                  {/* Características */}
                  <Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        mb: 2,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <span>⭐</span> Características destacadas
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'grid', 
                      gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' },
                      gap: 2 
                    }}>
                      {alojamiento.caracteristicas?.map((c, i) => (
                        <Box 
                          key={i} 
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5,
                            p: 1,
                            borderRadius: 1,
                            '&:hover': {
                              bgcolor: 'action.hover'
                            }
                          }}
                        >
                          <Box sx={{ 
                            width: 24, 
                            height: 24, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: 'primary.main'
                          }}>
                            {caracteristicaIcons[c] ?? '❓'}
                          </Box>
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {c.replaceAll("_", " ")}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
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
                height: { xs: 480, sm: 660 },
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                mt: 2
              }}
            >
              <MapContainer
                center={[alojamiento.direccion.latitud, alojamiento.direccion.longitud]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                  position={[alojamiento.direccion.latitud, alojamiento.direccion.longitud]}
                  icon={redDotIcon}>
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
