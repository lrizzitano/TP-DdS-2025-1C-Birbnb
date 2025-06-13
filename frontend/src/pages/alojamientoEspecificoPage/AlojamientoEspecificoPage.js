import { useParams } from "react-router-dom";

const AlojamientoEspecificoPage = () => {
    const { id } = useParams(); //sacamos el id de la url (parte de react router, lo saque de clases sabado)
    const alojamiento = getAlojamiento(id) // aca podriamos ir a buscarlo al backend

    // seria la verificacion de no encontrarlo
    if (!alojamiento) return <div>Producto no encontrado</div>;

    return (
      <>
        <p> Aca irian todos los componentes la vista alojamiento especifico </p>
        {/* Esto probablemente seria interesante hacerlo con componentes */}
        <img src={alojamiento.fotos[0]} width={"50%"} alt={alojamiento.nombre}></img>
        <h2>{alojamiento.nombre}</h2>
        <h3>Acerca de este lugar</h3>
        <p>{alojamiento.descripcion}</p>
      </>
    )
};

// funcion truchita para ir probando cosas
const getAlojamiento = (id) => {
  return {fotos:["https://a0.muscache.com/im/pictures/c42d676c-4733-4151-9f40-c2903f4a3cd0.jpg?im_w=960"],
  nombre: "Habitacion en Buenos Aires", precioPorNoche:50000, id:3,
  descripcion: `Habitación individual en un departamento luminoso y espacioso en el último piso (tercer piso y sin ascensor). La habitación es pequeña en tamaño y es de 3,6 m x 2 m = 7,2 metros cuadrados.Hay muchas tiendas y lugares para comer cerca, así como excelentes conexiones de transporte público (estaciones de metro West Kensington y Barons Court a menos de 2 a 7 minutos, y 28/306 rutas de autobús).Acceso a la terraza privada en la azotea disponible.`
}}

export default AlojamientoEspecificoPage; 