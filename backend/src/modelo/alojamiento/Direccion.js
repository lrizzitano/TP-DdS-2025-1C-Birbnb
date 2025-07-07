export class Direccion {
    constructor(calle, altura, ciudad, lat, long) {
        this.calle = calle;
        this.altura = altura;
        this.ciudad = ciudad; // instancia de Ciudad
        this.lat = lat;
        this.long = long;
    }
}