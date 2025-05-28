import { buildTestServer } from "./util/server"
import { describe, expect, jest, test } from "@jest/globals"
import request from 'supertest'
import { NotificacionService } from "../../backend/services/notificacionService.js"
import { NotificacionController } from "../../backend/controllers/notificacionController.js"

const server = buildTestServer()

const mockNotificacionRepository = {
    findByDestinatario: jest.fn().mockResolvedValue([
        {
            
        },
        {

        }
    ])

    async findById(id) {
        return await this.model.findById(id);
    }

    async create(notificacion) {
        const nuevaNotificacion = new this.model(notificacion);
        return await nuevaNotificacion.save();
    }

    async update(notificacion) {
        return await this.model.findByIdAndUpdate(
        notificacion.id,
        notificacion,
        { new: true }
        );
    }    
}

const notificacionService = new ReservaService(mockNotificacionRepository)
const notificacionController = new ReservaController(notificacionService)

server.setController(notificacionController);