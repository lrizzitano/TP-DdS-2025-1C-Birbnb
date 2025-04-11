import { Usuario } from "./clases/usuario.js";
import { Alojamiento, Ciudad, Pais, Direccion, Moneda, Foto } from "./clases/alojamiento.js";
import { Reserva, RangoFechas } from "./clases/reserva.js";

// Crear un usuario anfitrión
const anfitrion = new Usuario("Juan", "juan@mail.com", "anfitrión");


// Crear una direccion
const ciudadSpringfield = new Ciudad("Springfield", new Pais("USA"));
const paisUSA = new Pais("USA");
const direccionSimpson = new Direccion("Evergreen Terrace", 555, ciudadSpringfield, paisUSA, "62704", "3000");


// Crear un alojamiento con ese anfitrión y direccion
const alojamiento = new Alojamiento({
  anfitrion: anfitrion,
  nombre: "Cabaña en el bosque",
  descripcion: "Una cabaña tranquila para desconectar",
  precioPorNoche: 100,
  moneda: "USD",
  horarioCheckIn: "14:00",
  horarioCheckOut: "11:00",
  direccion: direccionSimpson,
  cantHuespedesMax: 4,
  caracteristicas: ["Chimenea", "WiFi"],
  reservas: [],
  fotos: []
});

console.log("✅ Alojamiento creado:", alojamiento);

// Crear un usuario huésped
const huesped = new Usuario("María", "maria@mail.com", "huésped");

// Crear un rango de fechas
const rango = new RangoFechas("2025-04-15", "2025-04-20");

// Crear una reserva
const reserva = new Reserva(rango, 2, huesped, alojamiento, "pendiente", alojamiento.precioPorNoche);

console.log("✅ Reserva creada:", reserva);