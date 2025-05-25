export class Usuario {
  constructor(nombre, email, tipo, notificaciones = []) {
    this.nombre = nombre;
    this.email = email;
    this.tipo = tipo;
    this.notificaciones = notificaciones
  }

  agregarNotificacion(unaNotificacion) {
    this.notificaciones.push(unaNotificacion)
  }

  ultimaNotificacion() {
    return this.notificaciones.slice(-1).pop()
  }
}
