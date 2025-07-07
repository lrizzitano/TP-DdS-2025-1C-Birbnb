export class RangoFechas {
    constructor(fechaInicio, fechaFin) {
        this.fechaInicio = new Date(fechaInicio);
        this.fechaFin = new Date(fechaFin);

        if (this.fechaFin < this.fechaInicio) {
            throw new Error('La fecha de fin no puede ser anterior a la de inicio.');
        }
    }
}