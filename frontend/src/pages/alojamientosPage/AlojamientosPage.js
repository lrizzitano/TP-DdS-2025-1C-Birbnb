import './AlojamientosPage.css';
import { useState, useEffect } from "react";
import CardAlojamiento from "../../components/cardAlojamiento/CardAlojamiento";
import { fetchAlojamientosBackend } from "../../api/api";
import FiltrosAlojamientos from "../../components/filtrosAlojamientos/FiltrosAlojamientos";
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const Alojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtersOut, setFiltersOut] = useState(true);
  const matches = useMediaQuery('(min-width: 768px)')


  // los temporales serian los que estan seleccionados pero no aplicados (se aplican al tocar el boton buscar)
  const [filtrosTemporales, setFiltrosTemporales] = useState({});
  const [filtrosAplicados, setFiltrosAplicados] = useState({});

  // Fetch cuando cambian los filtros aplicados
  useEffect(() => {
    setLoading(true);
    fetchAlojamientosBackend(filtrosAplicados).then(alojamientos => {
      setAlojamientos(alojamientos.data);
    })
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [filtrosAplicados]);

  const handleBuscar = () => {
    setFiltrosAplicados({ ...filtrosTemporales });
  };

  return (
      <div className = "pageAlojamientos">
      <IconButton onClick={() => {setFiltersOut(!filtersOut)}} color="inherit" sx={{display: 'none', '@media (max-width: 768px)': { display: 'flex' }}}>
          <FilterListIcon />
      </IconButton>

      {(filtersOut || matches) && <div className={"contenedorFiltros"}>
        <FiltrosAlojamientos
          filtrosTemporales={filtrosTemporales}
          setFiltrosTemporales={setFiltrosTemporales}
          onBuscar={handleBuscar}
        />
      </div>}

        {loading ? (
          <p>Cargando alojamientos...</p>
        ) : (
          <div className="contenedorCardsAlojamiento">
            {alojamientos.map((a) => (
              <CardAlojamiento alojamiento={a} key={a.id} />
            ))}
          </div>
        )}
      </div>
  )
};

export default Alojamientos; 