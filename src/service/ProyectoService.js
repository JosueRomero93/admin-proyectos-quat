import Service from "./Service";

class ProyectoService extends Service {

    async all() {
        return await this.get("/api/proyecto/all");
    }

    async create(data) {
        return await this.post("/api/proyecto/create", data);
    }

    async update(data) {
        return await this.post("/api/proyecto/update", data);
    }

}

const proyectoService = new ProyectoService();

export default proyectoService;