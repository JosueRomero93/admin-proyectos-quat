import React from 'react';

import { Icon, Input, message } from 'antd';

import GenericForm from '../../components/GenericForm';
import GenericTransfer from '../../components/GenericTransfer';
import GenericSelector from "../../components/GenericSelector";
import personalService from "../../service/PersonalService";
import securityService from '../../service/SecurityService';
import perfilService from '../../service/PerfilService';
import usuarioService from '../../service/UsuarioService';
import event from '../../Event';

export default class UsuarioDetalles extends React.Component {

    state = {
        enabled: true
    };

    render() {
        const usuario = this.props.usuario;
        usuario.credencial = usuario.credencial || {};
        usuario.personal = usuario.personal || {};
        usuario.perfiles = usuario.perfiles || [];
        console.log(usuario);
        return (
            <div>
                <GenericForm
                    name="usuario-detalles"
                    enabled={this.state.enabled}
                    buttonLabel="Guardar"
                    onSubmit={
                        async (values) => {
                            values.id = usuario.id;
                            console.log("values submit:", values);
                            const user = await usuarioService.update(values);

                            if (!user) {
                                return;
                            }

                            this.setState({
                                enabled: false
                            });

                            const perfiles_id = usuario.perfiles.map(perfil => perfil.id);

                            const removePerfiles = perfiles_id.filter(id => values.perfiles.indexOf(id) < 0);
                            const addPerfiles = values.perfiles.filter(id => perfiles_id.indexOf(id) < 0);

                            console.log("remove", removePerfiles);
                            console.log("add", addPerfiles);

                            await usuarioService.removePerfiles(values.id, removePerfiles);
                            await usuarioService.updatePerfiles(values.id, addPerfiles);

                            this.setState({
                                enabled: true
                            });
                
                            message.success("Usuario actualizado exitósamente");
                            // event.fire("close/drawer");
                            event.fire("usuario/refresh");
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
                                    ],
                                    initialValue: usuario.personal.id,
                                    valuePropName: "defaultValue"
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
                                    ],
                                    initialValue: usuario.credencial.correo
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
                                    ],
                                    initialValue: usuario.credencial.contraseña
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
                                    initialValue: usuario.credencial.max_intentos || 5,
                                },
                                render: (options) => (
                                    <Input
                                        placeholder="Intentos máximos"
                                        type="number"
                                        min="1"
                                        disabled={!options.enabled}
                                    />
                                )
                            },
                            {
                                name: "intentos",
                                label: "Intentos realizados",
                                options: {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Ingresa el número de intentos realizados"
                                        }
                                    ],
                                    initialValue: usuario.credencial.intentos || 0,
                                },
                                render: (options) => (
                                    <Input
                                        placeholder="Intentos realizados"
                                        type="number"
                                        min="0"
                                        disabled={!options.enabled}
                                    />
                                )
                            },
                            {
                                name: "perfiles",
                                label: "Perfiles",
                                bind: "transfer/usuario-detalles",
                                bindMap: perfiles => {
                                    console.log(perfiles);
                                    return perfiles.map(perfil => perfil.key);
                                },
                                options: {
                                    initialValue: usuario.perfiles.map(perfil => perfil.id)
                                },
                                render: options => (
                                    <GenericTransfer
                                        name="usuario-detalles"
                                        enabled={
                                            options.enabled &&
                                            securityService.hasPermissions(["usuario/cambios"])
                                        }
                                        dataSource={
                                            async () => {
                                                const perfiles = await perfilService.all();
                                                const perfiles_usuario = usuario.perfiles.map(
                                                    perfil => perfil.nombre
                                                );
                                                console.log(perfiles_usuario);
                                                return perfiles.map(perfil => {
                                                    return {
                                                        key: perfil.id,
                                                        title: perfil.nombre,
                                                        chosen: perfiles_usuario.indexOf(perfil.nombre) >= 0
                                                    };
                                                });
                                            }
                                        }
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