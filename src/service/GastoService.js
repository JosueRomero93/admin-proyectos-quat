import Service from "./Service";

class GastoService extends Service {

    async all() {
        return await this.get("/api/gasto/all");
    }

    async create(data) {
        return await this.post("/api/gasto/create", data);
    }

    async update(data) {
        return await this.post("/api/gasto/update", data);
    }

}

const gastoService = new GastoService();

export default gastoService;