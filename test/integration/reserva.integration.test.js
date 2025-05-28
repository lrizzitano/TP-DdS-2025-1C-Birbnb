/*
NO ANDA

import { buildTestServer } from "./util/server"
import { describe, expect, jest, test } from "@jest/globals"
import request from 'supertest'
import { ReservaService } from "../../backend/services/reservaService"
import { ReservaController } from "../../backend/controllers/reservaController"

const server = buildTestServer()

const mockReservaRepository = {
    findByIdConAlojamientoPopulado: jest.fn(id).mockResolvedValue({
        
    })
    
    {
        return await this.model.findById(id).populate('alojamiento');
    }

    async findByIdConAlojamientoYHuespedPopulado(id) {
      return await this.model.findById(id).populate('alojamiento').populate('huespedReservador');   
    }

    async findByIdConAlojamientoYAnfitrionPopulado(id) {
      return await this.model.findById(id).populate({
        path: 'alojamiento',
        populate: {
          path: 'anfitrion'
        }
      });
    }

    async findById(id) {
      return await this.model.findById(id);
    }

    async findByAlojamiento(alojamientoId) {
      return await this.model.find({alojamiento : alojamientoId});
    }

    async findByUsuario(usuarioId) {
      return await this.model.find({huespedReservador : usuarioId});
    }

    async create(instanciaDeReservaDominio) {
      const nuevaReserva = new this.model(instanciaDeReservaDominio);
      return await nuevaReserva.save();
    }

    async update(documentoDeReservaConDatosActualizados) { 
      return await documentoDeReservaConDatosActualizados.save();
    }
}

const reservaService = new ReservaService(productRepository)
const reservaController = new ReservaController(productService)

server.setController(reservaController);

*/