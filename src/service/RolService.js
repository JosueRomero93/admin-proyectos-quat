import Service from "./Service";

class RolService extends Service {

    async all() {
        return await this.get("/api/rol/all");
    }

    async create(data) {
        return await this.post("/api/rol/create", data);
    }

    async update(data) {
        return await this.post("/api/rol/update", data);
    }

}

const rolService = new RolService();

export default rolService;