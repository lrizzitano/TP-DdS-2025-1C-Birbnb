export class Alojamiento {
  constructor({
    anfitrion,
    nombre,
    descripcion,
    precioPorNoche,
    moneda,
    horarioCheckIn,
    horarioCheckOut,
    direccion,
    cantHuespedesMax,
    caracteristicas = [],
    reservas = [],
    fotos = []
  }) {
    this.anfitrion = anfitrion;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPorNoche = precioPorNoche;
    this.moneda = moneda;
    this.horarioCheckIn = horarioCheckIn;
    this.horarioCheckOut = horarioCheckOut;
    this.direccion = direccion;
    this.cantHuespedesMax = cantHuespedesMax;
    this.caracteristicas = caracteristicas;
    this.reservas = reservas;
    this.fotos = fotos;
  }

  estaDisponibleEn(rangoFechas) {
    return this.reservas.every((reserva) => {
      return (
        reserva.rangoDeFechas.fechaFin < rangoFechas.fechaInicio ||
        reserva.rangoDeFechas.fechaInicio > rangoFechas.fechaFin
      );
    })
  }

  tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
    return this.precioPorNoche >= valorMinimo
      && this.precioPorNoche <= valorMaximo;
  }

  tenesCaracteristica(caracteristica) {
    return this.caracteristicas.includes(caracteristica);
  }

  puedenAlojarse(cantHuespedes) {
    return cantHuespedes <= this.cantHuespedesMax;
  }
}