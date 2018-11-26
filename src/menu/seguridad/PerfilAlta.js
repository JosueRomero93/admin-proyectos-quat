import React from "react";

import { Input, message } from 'antd';

import event from "../../Event";
import GenericForm from "../../components/GenericForm";
import perfilService from "../../service/PerfilService";

export default class PerfilAlta extends React.Component {

    state = {
        enabled: true
    };

    render() {
        return (
            <div>
                <GenericForm
                    name="usuario-alta"
                    buttonLabel="Crear usuario"
                    enabled={this.state.enabled}
                    onSubmit={
                        async values => {
                            console.log(values);

                            values.id = 0;
                
                            const perfil = await perfilService.create(values);
                
                            if (!perfil) {
                                return;
                            }
                            
                            message.success("Perfil creado exitósamente");
                            event.fire("perfil/refresh");
                            event.fire("form:reset");
                        }
                    }
                    fields={
                        [
                            {
                                name: "nombre",
                                label: "Nombre",
                                options: {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Ingresa el nombre del perfil"
                                        }
                                    ]
                                },
                                render: options => (
                                    <Input disabled={!options.enabled} placeholder="Nombre" />
                                )
                            },
                            {
                                name: "descripcion",
                                label: "Descripción",
                                render: options => (
                                    <Input disabled={!options.enabled} placeholder="Descripción" />
                                )
                            }
                        ]
                    }
                />
            </div>
        );
    }

}