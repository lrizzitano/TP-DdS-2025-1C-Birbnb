export class Reserva {
  constructor(rangoDeFechas,
    cantHuespedes,
    usuario,
    alojamiento,
    estado,
    precioPorNoche,
    historialDeCambios = []) {
    this.fechaAlta = new Date(); 
    this.huespedReservador = usuario; // instancia de Usuario
    this.cantHuespedes = cantHuespedes; 
    this.alojamiento = alojamiento; // instancia de Alojamiento
    this.rangoDeFechas = rangoDeFechas;
    this.estado = estado;
    this.precioPorNoche = precioPorNoche; 
    this.historialDeCambios = historialDeCambios
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
}