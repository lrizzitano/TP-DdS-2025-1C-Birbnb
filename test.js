import { Usuario } from "./backend/modelo/Usuario.js";
import { Alojamiento } from "./backend/modelo/alojamiento/Alojamiento.js";
import { Ciudad } from "./backend/modelo/alojamiento/Ciudad.js";
import { Pais } from "./backend/modelo/alojamiento/Pais.js";
import { Caracteristica } from "./backend/modelo/enums/Caracteristica.js";
import { Moneda } from "./backend/modelo/enums/Moneda.js";
import { Foto } from "./backend/modelo/alojamiento/Foto.js";
import { Direccion } from "./backend/modelo/alojamiento/Direccion.js";
import { Reserva } from "./backend/modelo/reserva/Reserva.js";
import { RangoFechas } from "./backend/modelo/reserva/RangoFechas.js";

// Crear un usuario anfitrión
const anfitrion = new Usuario("Juan", "juan@mail.com", "anfitrión");


// Crear una direccion
const ciudadSpringfield = new Ciudad("Springfield", new Pais("USA"));
const paisUSA = new Pais("USA");
const direccionSimpson = new Direccion("Evergreen Terrace", 555, ciudadSpringfield, paisUSA, "62704", "3000");

// Crear un conjunto de fotos
const fotosCabaña = [
  new Foto("Vista de la cabaña", "/pureba.jpg"),
  new Foto("Interior de la cabaña", "prueba.jpg"),
];


// Crear un alojamiento con ese anfitrión y direccion
const alojamiento = new Alojamiento({
  anfitrion: anfitrion,
  nombre: "Cabaña en el bosque",
  descripcion: "Una cabaña tranquila para desconectar",
  precioPorNoche: 100,
  moneda: Moneda.USD,
  horarioCheckIn: "14:00",
  horarioCheckOut: "11:00",
  direccion: direccionSimpson,
  cantHuespedesMax: 4,
  caracteristicas: [Caracteristica.PILETA, Caracteristica.WIFI],
  reservas: [],
  fotos: fotosCabaña,
});

console.log("✅ Alojamiento creado:", alojamiento);

// Crear un usuario huésped
const huesped = new Usuario("María", "maria@mail.com", "huésped");

// Crear un rango de fechas
const rango = new RangoFechas("2025-04-15", "2025-04-20");

// Crear una reserva
const reserva = new Reserva(rango, 2, huesped, alojamiento, "pendiente", alojamiento.precioPorNoche);

console.log("✅ Reserva creada:", reserva);