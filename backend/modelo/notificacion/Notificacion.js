export class Notificacion {
  constructor(mensaje, usuario, fechaAlta, leida, fechaLeida) {
    this.usuario = usuario; // instancia de Usuario
    this.mensaje = mensaje;
    this.fechaAlta = fechaAlta; 
    this.leida = leida; // booleano
    this.fechaLeida = fechaLeida; // fecha de lectura
  }
}