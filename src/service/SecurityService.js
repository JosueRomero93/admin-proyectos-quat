import Service from "./Service";

class SecurityService extends Service {

    permissions = [];

    profiles = [
        "Administrador"
    ];

    hasPermission(permission) {
        return this.permissions.indexOf(permission) >= 0;
    }

    hasPermissions(permissions) {
        return permissions.every(permission => this.hasPermission(permission));
    }

    hasProfile(profile) {
        return this.profiles.indexOf(profile) >= 0;
    }

    hasProfiles(profiles) {
        return profiles.every(profile => this.hasProfile(profile));
    }

    async all() {
        return await this.get("/api/usuario/all");
    }

}

const securityService = new SecurityService();

export default securityService;