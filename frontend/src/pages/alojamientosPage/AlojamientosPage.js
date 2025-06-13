import CardAlojamiento from "../../components/cardAlojamiento/CardAlojamiento";
const mockAlojamiento = {fotos:["https://a0.muscache.com/im/pictures/c42d676c-4733-4151-9f40-c2903f4a3cd0.jpg?im_w=960"],
  nombre: "Habitacion en Buenos Aires", precioPorNoche:50000, id:3
}
const Alojamientos = () => {
    return (
      <>
        <p> Aca irian todos los componentes la vista Alojamientos, pongo ejemplo de card
            podriamos pensar como queremos mostrar todo </p>
        <div>
          <CardAlojamiento alojamiento={mockAlojamiento}></CardAlojamiento>
          <CardAlojamiento alojamiento={mockAlojamiento}></CardAlojamiento>
          <CardAlojamiento alojamiento={mockAlojamiento}></CardAlojamiento>
          <CardAlojamiento alojamiento={mockAlojamiento}></CardAlojamiento>
          <CardAlojamiento alojamiento={mockAlojamiento}></CardAlojamiento>
          <CardAlojamiento alojamiento={mockAlojamiento}></CardAlojamiento>
        </div>
      </>
    )
};

export default Alojamientos; 