const TipoUsuario = {
  ANFITRION: 0,
  HUESPED: 1
};

export class Usuario {
  constructor(nombre, email, tipo, notificaciones = []) {
    this.nombre = nombre;
    this.email = email;
    this.tipo = tipo; // TipoUsuario
    this.notificaciones = notificaciones
  }

  agregarNotificacion(unaNotificacion) {
    this.notificaciones.push(unaNotificacion)
  }
}
