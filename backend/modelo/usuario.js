const TipoUsuario = {
  ANFITRION: 0,
  HUESPED: 1
};

export class Usuario {
  constructor(nombre, email, tipo) {
    this.nombre = nombre;
    this.email = email;
    this.tipo = tipo; // TipoUsuario
  }
}
