export class Notificacion {
  constructor(mensaje, fechaAlta, leida, fechaLeida) {
    this.mensaje = mensaje;
    this.fechaAlta = fechaAlta; 
    this.leida = leida; // booleano
    this.fechaLeida = fechaLeida; // fecha de lectura
  }
}