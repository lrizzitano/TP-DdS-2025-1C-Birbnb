import './AlojamientosPage.css';
import { useState, useEffect } from "react";
import CardAlojamiento from "../../components/cardAlojamiento/CardAlojamiento";
import { fetchAlojamientosBackend } from "../../api/api";
import FiltrosAlojamientos from "../../components/filtrosAlojamientos/FiltrosAlojamientos";

const Alojamientos = () => {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <>

      <div className="contenedor-alojamientos">
        <FiltrosAlojamientos
          filtrosTemporales={filtrosTemporales}
          setFiltrosTemporales={setFiltrosTemporales}
          onBuscar={handleBuscar}
        />

        {loading ? (
          <p>Cargando alojamientos...</p>
        ) : (
          <div className="contenedor-cards-alojamiento">
            {alojamientos.map((a) => (
              <CardAlojamiento alojamiento={a} key={a.id} />
            ))}
          </div>
        )}
      </div>
    </>
  )
};

export default Alojamientos; 