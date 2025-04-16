import { Reserva, RangoFechas } from "./reserva.js";
import { Usuario } from "./usuario.js";

// Prueba push boludo
const Monedas = {
    DOLAR_USA: 0,
  PESO_ARG: 1,
  REALES: 2
};


const Caracteristicas = {
    WIFI: 0,
    PILETA: 1,
    MASCOTAS_PERMITIDAS: 2,
    ESTACIONAMIENTO: 3,
};

export class Alojamiento {
    constructor({
      anfitrion,
      nombre,
      descripcion,
      precioPorNoche,
      moneda,
      horarioCheckIn,
      horarioCheckOut,
      direccion,
      cantHuespedesMax,
      caracteristicas = [],
      reservas = [],
      fotos = []
    }) {
      this.anfitrion = anfitrion;
      this.nombre = nombre;
      this.descripcion = descripcion;
      this.precioPorNoche = precioPorNoche;
      this.moneda = moneda;
      this.horarioCheckIn = horarioCheckIn;
      this.horarioCheckOut = horarioCheckOut;
      this.direccion = direccion;
      this.cantHuespedesMax = cantHuespedesMax;
      this.caracteristicas = caracteristicas;
      this.reservas = reservas;
      this.fotos = fotos;
    }
  
    estasDisponibleEn() {
// ver de hacer 
    }
  
    tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
      return this.precioPorNoche >= valorMinimo 
      && this.precioPorNoche <= valorMaximo;
    }
  
    tenesCaracteristica(caracteristica) {
      return this.caracteristicas.includes(caracteristica);
    }
  
    puedenAlojarse(cantHuespedes) {
      return cantHuespedes <= this.cantHuespedesMax;
    }

  }





export class Pais {
    constructor(nombre) {
      this.nombre = nombre;
    }
  }


export class Ciudad {
    constructor(nombre, pais) {
      this.nombre = nombre;
      this.pais = pais; // instancia de Pais
    }
  }  


export class Direccion {
    constructor(calle, altura, ciudad, pais, lat, long) {
      this.calle = calle;
      this.altura = altura;
      this.ciudad = ciudad; // instancia de Ciudad
      this.pais = pais; // instancia de Pais
      this.lat = lat;
      this.long = long;
    }
  }









export class Moneda {
  constructor(nombre, simbolo, cotizacionRespectoDolar) {
    this.nombre = nombre;
    this.simbolo = simbolo;
    this.cotizacionRespectoDolar = cotizacionRespectoDolar;
  }
}


  

export class Foto {
    constructor(descripcion, path) {
      this.descripcion = descripcion;
      this.path = path;
    }
  }