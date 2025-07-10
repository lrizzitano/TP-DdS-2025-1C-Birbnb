import './AlojamientosPage.css';
import { useState, useEffect } from "react";
import CardAlojamiento from "../../components/cardAlojamiento/CardAlojamiento";
import { fetchAlojamientosBackend } from "../../api/api";
import FiltrosAlojamientos from "../../components/filtrosAlojamientos/FiltrosAlojamientos";
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, CircularProgress } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Pagination from '@mui/material/Pagination';

const Alojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filtersOut, setFiltersOut] = useState(true);
  const matches = useMediaQuery('(min-width: 768px)')


  // los temporales serian los que estan seleccionados pero no aplicados (se aplican al tocar el boton buscar)
  const [filtrosTemporales, setFiltrosTemporales] = useState({precioMin: 10, precioMax: 300});
  const [filtrosAplicados, setFiltrosAplicados] = useState({});

  // Fetch cuando cambian los filtros aplicados
  useEffect(() => {
    setLoading(true);
    fetchAlojamientosBackend(filtrosAplicados).then(alojamientos => {
      setAlojamientos(alojamientos.data);
      setPaginaActual(alojamientos.pagina);
      setTotalPaginas(alojamientos.paginas_totales);
    })
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [filtrosAplicados]);

  const handleBuscar = () => {
    setFiltrosAplicados({ ...filtrosTemporales });
  };

  const handleCambioPagina = (event, nuevaPagina) => {
    setFiltrosAplicados({ ...filtrosAplicados, page: nuevaPagina });
  };


  return (
    <div className="pageAlojamientos">

      <IconButton onClick={() => { setFiltersOut(!filtersOut) }} color="inherit" sx={{ display: 'none', '@media (max-width: 768px)': { display: 'flex' } }}>
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
        <CircularProgress />
      ) : (
        <div className="contenedorCardsAlojamiento">
          {alojamientos.map((a) => (
            <CardAlojamiento alojamiento={a} key={a.id} />
          ))}
        </div>
      )}

      <Pagination
        count={totalPaginas}
        size="large"
        page={paginaActual}
        onChange={handleCambioPagina}
      />
    </div>
  )
};

export default Alojamientos; 