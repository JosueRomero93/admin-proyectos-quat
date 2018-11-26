import React from "react";

import { Service, loginService } from "../../Service";

export default class MiComponente extends React.Component {

    async enviarPeticion() {
        const url = "http://187.162.173.4:8080/api/gasto/all";
        
        const result = await Service.get(url);

        console.log(result);
    }

    async probarLogin() {
        await loginService.login({
            correo: "vic@quat",
            contraseña: "vic123"
        });
    }

    render() {

        return (
            <div>
                <button onClick={e => this.enviarPeticion()}>Enviar petición</button>
                <button onClick={e => this.probarLogin()}>Probar Login</button>
            </div>
        );

    }

}