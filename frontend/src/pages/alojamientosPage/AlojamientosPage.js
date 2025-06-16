import { useState, useEffect } from "react";
import CardAlojamiento from "../../components/cardAlojamiento/CardAlojamiento";
import { fetchAlojamientosBackend } from "../../api/api";
const mockAlojamiento = {fotos:["https://a0.muscache.com/im/pictures/c42d676c-4733-4151-9f40-c2903f4a3cd0.jpg?im_w=960"],
  nombre: "Habitacion en Buenos Aires", precioPorNoche:50000, id:3
}
const Alojamientos = () => {
    const [alojamientos, setAlojamientos] = useState([]);
    const [loading, setLoading] = useState(false);
  
    // los temporales serian los que estan seleccionados pero no aplicados (se aplican al tocar el boton buscar)
    const [filtrosTemporales, setFiltrosTemporales] = useState({ciudad:'', precioMin:'', precioMax:''});
    const [filtrosAplicados, setFiltrosAplicados] = useState({ciudad:'', precioMin:'', precioMax:''});
  
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
        <p> Aca irian todos los componentes la vista Alojamientos, pongo ejemplo de card
            podriamos pensar como queremos mostrar todo </p>

      {/* Filtros */}
      <div>
        <input
          type="text"
          placeholder="Ciudad"
          value={filtrosTemporales.ciudad}
          onChange={(e) => setFiltrosTemporales({ ...filtrosTemporales, ciudad: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio minimo"
          value={filtrosTemporales.precioMin}
          onChange={(e) => setFiltrosTemporales({ ...filtrosTemporales, precioMin: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio maximo"
          value={filtrosTemporales.precioMax}
          onChange={(e) => setFiltrosTemporales({ ...filtrosTemporales, precioMax: e.target.value })}
        />
        <button onClick={handleBuscar}>Buscar</button>
        
      {/* Resultado */}
      {loading ? (
          <p>Cargando alojamientos...</p>
        ) : (
          <div className = "contenedor-cards-alojamiento">
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