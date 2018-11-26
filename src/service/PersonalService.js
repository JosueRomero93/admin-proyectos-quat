import Service from "./Service";

class PersonalService extends Service {

    async all() {
        return await this.get("/api/personal/all");
    }

    async create(data) {
        return await this.post("/api/personal/create", data);
    }

    async update(data) {
        return await this.post("/api/personal/update", data);
    }

}

const personalService = new PersonalService();

export default personalService;