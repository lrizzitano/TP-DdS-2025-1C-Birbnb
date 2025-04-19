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