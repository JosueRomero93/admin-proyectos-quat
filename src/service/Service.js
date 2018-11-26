import { notification } from "antd";

export default class Service {

    host = "http://187.162.173.4:8080";
    // host = "http://localhost:8080";

    async call_fetch(url, config = null, options = {}) {
        try {
            if (!url.match(/^\w+:\/\//)) {
                url = `${this.host}${url}`;
            }

            const response = await fetch(url, config);
    
            if (!response.ok) {
                const text = await response.text();
    
                console.log(":service/post error", text);

                let message = "";

                try {
                    const error = JSON.parse(text);
                    message = error.message;
                } catch(e) {
                    message = "Error al enviar la petición al servidor";
                }
    
                notification.error({
                    message: "Error en el servidor",
                    description: options.description || message
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

    async get(url, data = {}, options = {}) {
        const query = [];

        for (let key in data) {
            query.push(`${key}=${data[key]}`);
        }

        if (query.length > 0) {
            url += `?${query.join("&")}`;
        }

        return this.call_fetch(url, null, options);
    }

    async post(url, data = {}, options = {}) {
        const formData = new FormData();

        for (let key in data) {
            formData.append(key, data[key]);
        }

        const config = {
            method: "post",
            mode: "cors",
            body: formData
        };

        return this.call_fetch(url, config, options);
    }

}