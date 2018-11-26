import React from 'react';

import { Input, message } from 'antd';

import GenericForm from '../../components/GenericForm';
import rolService from '../../service/RolService';
import event from '../../Event';

export default class RolDetalles extends React.Component {

    state = {
        enabled: true
    };

    render() {
        const rol = this.props.rol;
        console.log(rol);
        return (
            <div>
                <GenericForm
                    enabled={this.state.enabled}
                    buttonLabel="Guardar"
                    onSubmit={
                        async (values) => {
                            values.id = rol.id;
                            console.log("values submit:", values);
                            const response = await rolService.update(values);

                            if (!response) {
                                return;
                            }
                
                            message.success("Rol actualizado exitósamente");
                            // event.fire("close/drawer");
                            event.fire("rol/refresh");
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
                                    ],
                                    initialValue: rol.nombre,
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
                                    ],
                                    initialValue: rol.permiso,
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
                                options: {
                                    initialValue: rol.descripcion,
                                },
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