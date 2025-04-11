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
    




