import Service from "./Service";

class UsuarioService extends Service {

    async all() {
        return await this.get("/api/usuario/all");
    }

    async create(data) {
        return await this.post("/api/usuario/create", data);
    }

    async update(data) {
        return await this.post("/api/usuario/update", data);
    }

    async updatePerfiles(usuario_id, perfiles) {
        for (let id of perfiles) {
            await this.get("/api/usuario/add/perfil", {
                id_usuario: usuario_id,
                perfil_id: id
            });
        }
    }

    async removePerfiles(usuario_id, perfiles) {
        for (let id of perfiles) {
            await this.get("/api/usuario/remove/perfil", {
                id_usuario: usuario_id,
                perfil_id: id
            });
        }
    }

}

const usuarioService = new UsuarioService();

export default usuarioService;