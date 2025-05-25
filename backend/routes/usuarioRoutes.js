import { UsuarioController } from "../controllers/usuarioController.js";


export function registerUsuarioRoutes(app, getController) {
    app.get("/usuarios", (req, res) =>
        getController(UsuarioController).findAll(req, res)
    );

    app.get("/usuarios/:id", (req, res) =>
        getController(UsuarioController).findById(req, res)
    );

    app.post("/usuarios", (req, res) =>
        getController(UsuarioController).create(req, res)
    );

    app.delete("/usuarios/:id", (req, res) =>
        getController(UsuarioController).delete(req, res)
    );

    app.put("/usuarios/:id", (req, res) =>
        getController(UsuarioController).update(req, res)
    );
}