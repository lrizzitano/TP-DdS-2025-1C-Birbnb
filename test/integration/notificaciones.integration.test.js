import { buildTestServer } from "./util/server"
import { describe, expect, jest, test } from "@jest/globals"
import request from 'supertest'
import { NotificacionService } from "../../backend/services/notificacionService.js"
import { NotificacionController } from "../../backend/controllers/notificacionController.js"
import { EstadoNotificacion } from "../../backend/modelo/enums/EstadoNotificacion"
import { nombreEnum } from "../../backend/modelo/enums/nombreEnum.js";

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
    findById: jest.fn().mockImplementation((id) => {
        if (id == '6650f1a5cfc8b9a4a1a00001') {
            return Promise.resolve({
                    mensaje : "NotificacionTest",
                    fechaAlta : "fechaTest",
                    estado : EstadoNotificacion.PENDIENTE,
                    fechaLeida : null,
                    destinatario : {
                        nombre: "usuarioTest"
                    },
                    marcarComoLeida: function() {this.estado = EstadoNotificacion.LEIDA}
                })
        } else {
            return Promise.resolve(null);
        }
    }),
    update: jest.fn().mockResolvedValue({
        mensaje : "NotificacionTest",
        fechaAlta : "fechaTest",
        estado : EstadoNotificacion.LEIDA,
        fechaLeida : null,
        destinatario : {
            nombre: "usuarioTest"
        }
    })  
}

const notificacionService = new NotificacionService(mockNotificacionRepository);
const notificacionController = new NotificacionController(notificacionService);

server.setController(NotificacionController, notificacionController);

server.configureRoutes();

describe("GET /notificaciones?destinatario=idDestinatario", () => {
    test("Debe retornar un estado 200 y 2 notificaciones ante request bien hecha", async () => {
        const idDestinatarioExistente = "6650f1a5cfc8b9a4a1a00001"
        const response = await request(server.app).get("/notificaciones").query({"destinatario":idDestinatarioExistente});

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        expect(mockNotificacionRepository.findByDestinatario).toHaveBeenCalledWith({"destinatario": "6650f1a5cfc8b9a4a1a00001"});
    })

    test("Debe retornar un estado 400 ante query con id invalido", async () => {
        const idInvalido = "123"
        const response = await request(server.app).get("/notificaciones").query({"destinatario": idInvalido});

        expect(response.status).toBe(400);
    })

    test("Debe retornar un estado 404 ante query con id invalido pero plausible", async () => {
        const idInvalido = "6650f1a5cfc8b9a4a1a00002"
        const response = await request(server.app).get("/notificaciones").query({"destinatario": idInvalido});

        expect(response.status).toBe(404);
    })
})

describe("PATCH /notificaciones/:id - Marca como leida", () => {
    test("Debe retornar una notificacion con estado LEIDA", async () => {
        const idExistente = "6650f1a5cfc8b9a4a1a00001";
        const response = await request(server.app).patch("/notificaciones/" + idExistente)

        expect(response.status).toBe(200);
        expect(response.body.estado).toBe(nombreEnum(EstadoNotificacion, EstadoNotificacion.LEIDA));
        expect(mockNotificacionRepository.findById).toHaveBeenCalledWith(idExistente);
        expect(mockNotificacionRepository.update).toHaveBeenCalled();
    })

    test("Debe retornar 404 si se pide marcar una notificacion inexistente", async () => {
        const idInexistente = "6650f1a5cfc8b9a4a1a00002";
        const response = await request(server.app).patch("/notificaciones/" + idInexistente)

        expect(response.status).toBe(404);
        expect(mockNotificacionRepository.findById).toHaveBeenCalledWith(idInexistente);
    })
})