import { buildTestServer } from "./util/server"
import { describe, expect, jest, test } from "@jest/globals"
import request from 'supertest'
import { NotificacionService } from "../../backend/services/notificacionService.js"
import { NotificacionController } from "../../backend/controllers/notificacionController.js"
import { EstadoNotificacion } from "../../backend/modelo/enums/EstadoNotificacion"

const server = buildTestServer()

const mockNotificacionRepository = {
    findByDestinatario: jest.fn().mockResolvedValue([
        {
            mensaje : "NotificacionTest",
            fechaAlta : "fechaTest",
            estado : EstadoNotificacion.PENDIENTE,
            fechaLeida : null,
            destinatario : {
                nombre: "usuarioTest"
            }
        },
        {
            mensaje : "Notificacion2est",
            fechaAlta : "fechaTest",
            estado : EstadoNotificacion.PENDIENTE,
            fechaLeida : null,
            destinatario : {
                nombre: "usuarioTest"
            }
        }
    ]),
    findById: jest.fn().mockResolvedValue({
        mensaje : "NotificacionTest",
        fechaAlta : "fechaTest",
        estado : EstadoNotificacion.PENDIENTE,
        fechaLeida : null,
        destinatario : {
            nombre: "usuarioTest"
        }
    }),
    create: jest.fn().mockResolvedValue({
        mensaje : "NotificacionTest",
        fechaAlta : "fechaTest",
        estado : EstadoNotificacion.PENDIENTE,
        fechaLeida : null,
        destinatario : {
            nombre: "usuarioTest"
        }
    }),
    update: jest.fn().mockResolvedValue({
        mensaje : "NotificacionTest",
        fechaAlta : "fechaTest",
        estado : EstadoNotificacion.PENDIENTE,
        fechaLeida : null,
        destinatario : {
            nombre: "usuarioTest"
        }
    })  
}

const notificacionService = new NotificacionService(mockNotificacionRepository);
const notificacionController = new NotificacionController(notificacionService);

server.configureRoutes();
server.setController(notificacionController);
/*
quiero testear estas routes

app.get("/notificaciones", (req, res) =>
    getController(NotificacionController).findByDestinatario(req, res)
);

app.patch("/notificaciones/:id", (req, res) =>
    getController(NotificacionController).updateEstado(req, res)
);

*/

describe("GET /notificaciones?destinatario=idDestinatario", () => {
    test("Debe retornar un estado 200 y 2 notificaciones", async () => {
        const response = await request(server.app).get("/notificaciones").query({destinatario:"6650f1a5cfc8b9a4a1a00001"});

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
    })
})
