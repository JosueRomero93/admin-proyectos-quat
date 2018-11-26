import React from "react";

import { Icon, Input, message } from 'antd';

import event from "../../Event";
import GenericForm from "../../components/GenericForm";
import GenericSelector from "../../components/GenericSelector";
import personalService from "../../service/PersonalService";
import usuarioService from "../../service/UsuarioService";

export default class UsuarioAlta extends React.Component {

    state = {
        credencial_id: 0
    };

    render() {
        return (
            <div>
                <GenericForm
                    name="usuario-alta"
                    buttonLabel="Crear usuario"
                    enabled={this.state.credencial_id === 0}
                    onSubmit={
                        async values => {
                            console.log(values);
                            
                            this.setState({
                                credencial_id: 1
                            });
                
                            const user = await usuarioService.create(values);
                
                            if (!user) {
                                this.setState({
                                    credencial_id: 0
                                });
                                return;
                            }
                            
                            message.success("Usuario creado exitósamente");
                            // event.fire("close/drawer");
                            event.fire("usuario/refresh");
                            event.fire("form:reset");
                        }
                    }
                    fields={
                        [
                            {
                                name: "personal_id",
                                label: "Personal",
                                bind: "selector/personal_id",
                                options: {
                                    rules: [
                                        {
                                            required: true, 
                                            message: "Ingresa el personal asociado"
                                        }
                                    ]
                                },
                                render: (options) => {
                                    return (
                                        <GenericSelector 
                                            name="personal_id"
                                            enabled={options.enabled}
                                            dataSource={ 
                                                async () => {
                                                    const personal = await personalService.all();
                                                    return personal.map(persona => {
                                                        return {
                                                            id: persona.id,
                                                            label: `${persona.nombre} ${persona.ap_paterno} `+
                                                            `${persona.ap_materno || ""}`
                                                        };
                                                    })
                                                }
                                            }
                                        />
                                    );
                                }
                            },
                            {
                                name: "correo",
                                label: "Correo",
                                options: {
                                    rules: [
                                        {
                                            required: true, 
                                            message: "Ingresa el correo"
                                        }
                                    ]
                                },
                                render: (options) => {
                                    return (
                                        <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                                            placeholder="Correo"
                                            disabled={!options.enabled}
                                        />
                                    );
                                }
                            },
                            {
                                name: "contraseña",
                                label: "Contraseña",
                                options: {
                                    rules: [
                                        {
                                            required: true, 
                                            message: "Ingresa la contraseña"
                                        }
                                    ]
                                },
                                render: (options) => {
                                    return (
                                        <Input
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                                            placeholder="Contraseña"
                                            type="password"
                                            disabled={!options.enabled}
                                        />
                                    );
                                }
                            },
                            {
                                name: "max_intentos",
                                label: "Intentos máximos",
                                options: {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Ingresa el número máximo de intentos"
                                        }
                                    ],
                                    initialValue: 5,
                                },
                                render: (options) => (
                                    <Input
                                        placeholder="Intentos máximos"
                                        type="number"
                                        min="1"
                                        disabled={!options.enabled}
                                    />
                                )
                            }
                        ]
                    }
                />
            </div>
        );
    }

}