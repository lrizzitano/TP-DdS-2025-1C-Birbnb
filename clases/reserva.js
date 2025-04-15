const EstadoReserva = {
  PENDIENTE: '0',
  CONFIRMADA: '1',
  CANCELADA: '2'
}


export class Reserva {
    constructor(rangoDeFechas, 
      cantHuespedes, 
      usuario, 
      alojamiento, 
      estado, 
      precioPorNoche) {
      this.fechaAlta = new Date(); // fecha en la que se crea la reserva
      this.huéspedReservador = usuario; // instancia de Usuario
      this.cantHuespedes = cantHuespedes; // por defecto
      this.alojamiento = alojamiento; // instancia de Alojamiento
      this.rangoDeFechas = rangoDeFechas;
      this.estado = estado;
      this.precioPorNoche = precioPorNoche; // precio por noche del alojamiento
    }

      actualizarEstado(nuevoEstado) {
        // this.estado = nuevoEstado;
      }
  }











export class RangoFechas {
    constructor(fechaInicio, fechaFin) {
      this.fechaInicio = new Date(fechaInicio);
      this.fechaFin = new Date(fechaFin);
  
      if (this.fechaFin < this.fechaInicio) {
        throw new Error('La fecha de fin no puede ser anterior a la de inicio.');
      }
    }
    

  }
    









export class CambioEstadoReserva {
  constructor(fecha, estadoReserva, reserva, motivo, usuario) {
    this.fecha = new Date(fecha); // fecha en la que se realiza el cambio de estado
    this.estadoReserva = estadoReserva; // instancia de EstadoReserva
    this.reserva = reserva; // instancia de Reserva
    this.motivo = motivo; // motivo del cambio de estado
    this.usuario = usuario; // instancia de Usuario que realiza el cambio
  }
  

}