import Service from "./Service";

class PerfilService extends Service {

    async all() {
        return await this.get("/api/perfil/all");
    }

    async create(data) {
        return await this.post("/api/perfil/create", data);
    }

    async update(data) {
        return await this.post("/api/perfil/update", data);
    }

    async updateRoles(perfil_id, roles) {
        for (let id of roles) {
            await this.get("/api/perfil/add/rol", {
                id_perfil: perfil_id,
                rol_id: id
            });
        }
    }

    async removeRoles(perfil_id, roles) {
        for (let id of roles) {
            await this.get("/api/perfil/remove/rol", {
                id_perfil: perfil_id,
                rol_id: id
            });
        }
    }

}

const perfilService = new PerfilService();

export default perfilService;