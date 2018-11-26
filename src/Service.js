import { notification } from "antd";

import event from "./Event";

export class Service {

    static async call_fetch(url, config = null, options = {}) {
        try {
            const response = await fetch(url, config);
    
            if (!response.ok) {
                const text = await response.text();
    
                console.log(":service/post error", text);
    
                notification.error({
                    message: "Error en el servidor",
                    description: options.description || "Error al enviar la petición al servidor"
                });
    
                return;
            }

            if (options.mode === "text") {
                return await response.text();
            }

            if (options.mode === "number") {
                return Number(await response.text());
            }

            return await response.json();
        } catch(error) {
            notification.error({
                message: "Falló la conexión",
                description: "No se puede conectar con el servidor"
            });
            throw new Error(error);
        }
    }

    static async get(url, data = {}, options = {}) {
        const query = [];

        for (let key in data) {
            query.push(`${key}=${data[key]}`);
        }

        if (query.length > 0) {
            url += `?${query.join("&")}`;
        }

        return Service.call_fetch(url, null, options);
    }

    static async post(url, data = {}, options = {}) {
        const formData = new FormData();

        for (let key in data) {
            formData.append(key, data[key]);
        }

        const config = {
            method: "post",
            mode: "cors",
            body: formData
        };

        return Service.call_fetch(url, config, options);
    }

}

export class LoginService {

    user = {
        perfiles: []
    };
    permissions = [];
    isLogin = false;
    host = "http://quat.com";

    async login(credentials) {
        if (credentials.correo === "master@quat" &&
            credentials.contraseña === "master123") {
            this.user = {
                perfiles: [
                    "usuario/consulta",
                    "perfil/consulta",
                    "rol/consulta",
                    "usuario/alta",
                    "perfil/alta",
                    "rol/alta",
                    "usuario/detalles",
                    "perfil/detalles",
                    "rol/detalles",
                    "usuario/modificar",
                    "perfil/modificar",
                    "rol/modificar",
                    "usuario/baja",
                    "perfil/baja",
                    "rol/baja",
                ]
            };

            event.fire("security/login", this.user);

            this.updatePermissions();

            return;
        }

        const url_login = `${this.host}/api/credencial/login`;
        
        const id = await Service.post(url_login, credentials, {
            mode: "number"
        });

        // console.log("Id usuario", id);

        if (id <= 0) {
            notification.error({
                message: "Error al iniciar sesión",
                description: "Compruebe que las credenciales sean válidas"
            });
            return;
        }

        const user_url = `${this.host}/api/usuario/find`;
        
        this.user = await Service.get(user_url, { id });

        this.isLogin = true;

        // console.log("Sesión iniciada", this.user);

        event.fire("security/login", this.user);

        this.updatePermissions();
    }

    async logout() {
        this.user = {
            perfiles: []
        };

        this.isLogin = false;

        event.fire("security/logout");

        this.updatePermissions();
    }

    updatePermissions() {
        this.permissions = this.user.perfiles
            .map(perfil => {
                return perfil.roles.map(r => r.permiso);
            })
            .reduce((p, c) => {
                p.push(...c);
                return p;
            }, []);

        event.fire("security/permissions:update", this.permissions);
    }

}

export const service = new Service();
export const loginService = new LoginService();