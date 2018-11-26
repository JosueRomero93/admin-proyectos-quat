import React from 'react';

import { Input, message } from 'antd';

import GenericForm from '../../components/GenericForm';
import GenericTransfer from '../../components/GenericTransfer';
import securityService from '../../service/SecurityService';
import perfilService from '../../service/PerfilService';
import rolService from '../../service/RolService';
import event from '../../Event';

export default class PerfilDetalles extends React.Component {

    state = {
        enabled: true
    };

    render() {
        const perfil = this.props.perfil;
        perfil.roles = perfil.roles || [];
        console.log(perfil);
        return (
            <div>
                <GenericForm
                    enabled={this.state.enabled}
                    buttonLabel="Guardar"
                    onSubmit={
                        async (values) => {
                            values.id = perfil.id;
                            console.log("values submit:", values);
                            const result = await perfilService.update(values);

                            if (!result) {
                                return;
                            }

                            this.setState({
                                enabled: false
                            });

                            const roles_id = perfil.roles.map(rol => rol.id);

                            const removeRoles = roles_id.filter(id => values.roles.indexOf(id) < 0);
                            const addRoles = values.roles.filter(id => roles_id.indexOf(id) < 0);

                            console.log("remove", removeRoles);
                            console.log("add", addRoles);

                            await perfilService.removeRoles(values.id, removeRoles);
                            await perfilService.updateRoles(values.id, addRoles);

                            this.setState({
                                enabled: true
                            });
                
                            message.success("Perfil actualizado exitósamente");
                            // event.fire("close/drawer");
                            event.fire("perfil/refresh");
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
                                    ],
                                    initialValue: perfil.nombre,
                                },
                                render: options => (
                                    <Input disabled={!options.enabled} placeholder="Nombre" />
                                )
                            },
                            {
                                name: "descripcion",
                                label: "Descripción",
                                options: {
                                    initialValue: perfil.descripcion,
                                },
                                render: options => (
                                    <Input disabled={!options.enabled} placeholder="Descripción" />
                                )
                            },
                            {
                                name: "roles",
                                label: "Roles",
                                bind: "transfer/perfil-roles",
                                bindMap: roles => {
                                    console.log(roles);
                                    return roles.map(rol => rol.key);
                                },
                                options: {
                                    initialValue: (perfil.roles || []).map(rol => rol.id)
                                },
                                render: options => (
                                    <GenericTransfer
                                        name="perfil-roles"
                                        enabled={
                                            options.enabled &&
                                            securityService.hasPermissions(["usuario/cambios"])
                                        }
                                        dataSource={
                                            async () => {
                                                const roles = await rolService.all();
                                                const roles_perfil = perfil.roles.map(
                                                    perfil => perfil.id
                                                );
                                                console.log(roles_perfil);
                                                return roles.map(rol => {
                                                    return {
                                                        key: rol.id,
                                                        title: rol.nombre,
                                                        chosen: roles_perfil.indexOf(rol.id) >= 0
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