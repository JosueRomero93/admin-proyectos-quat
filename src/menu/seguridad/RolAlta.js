import React from "react";

import {Input, message } from 'antd';

import event from "../../Event";
import GenericForm from "../../components/GenericForm";
import rolService from "../../service/RolService";

export default class RolAlta extends React.Component {

    render() {
        return (
            <div>
                <GenericForm
                    buttonLabel="Crear rol"
                    enabled={true}
                    onSubmit={
                        async values => {
                            console.log(values);
                            
                            values.id = 0;
                
                            const rol = await rolService.create(values);
                
                            if (!rol) {
                                return;
                            }
                            
                            message.success("Rol creado exitósamente");
                            // event.fire("close/drawer");
                            event.fire("rol/refresh");
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
                                            message: "Ingresa el nombre del rol"
                                        }
                                    ]
                                },
                                render: (options) => {
                                    return (
                                        <Input
                                            placeholder="Nombre del rol"
                                            disabled={!options.enabled}
                                        />
                                    );
                                }
                            },
                            {
                                name: "permiso",
                                label: "Permiso",
                                options: {
                                    rules: [
                                        {
                                            required: true, 
                                            message: "Ingresa el permiso del rol"
                                        }
                                    ]
                                },
                                render: (options) => {
                                    return (
                                        <Input
                                            placeholder="Permiso del rol"
                                            disabled={!options.enabled}
                                        />
                                    );
                                }
                            },
                            {
                                name: "descripcion",
                                label: "Descripción",
                                render: (options) => {
                                    return (
                                        <Input
                                            placeholder="Descripción del rol"
                                            disabled={!options.enabled}
                                        />
                                    );
                                }
                            },
                        ]
                    }
                />
            </div>
        );
    }

}