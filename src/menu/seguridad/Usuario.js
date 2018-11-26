import React from "react";

import { Button, Table, Tag, Divider, message } from "antd";

import event from "../../Event";
import UsuarioAlta from "./UsuarioAlta";
import UsuarioService from "../../service/UsuarioService";
import UsuarioDetalles from "./UsuarioDetalles";
import securityService from "../../service/SecurityService";

const columns = [
    {
        title: "Id",
        key: "id",
        dataIndex: "id"
    },
    {
        title: "Personal Asociado",
        key: "personal",
        dataIndex: "personal",
        render: (personal) => {
            if (personal === null) {
                return <Tag color="red">No hay personal asociado</Tag>;
            }
            const nombre = `${personal.nombre} ${personal.ap_paterno || ""} ${personal.ap_materno || ""}`;
            return <span>{nombre}</span>;
        }
    },
    {
        title: "Correo",
        key: "correo",
        dataIndex: "credencial",
        render: (credencial) => {
            if (credencial == null) {
                return <Tag color="red">No hay correo asociado</Tag>;
            }
            return <span>{credencial.correo}</span>;
        }
    },
    {
        title: "Intentos Fallidos",
        key: "intentos",
        render: (value, field) => {
            return <span>{`${(field.credencial || {}).intentos || 0} / ${(field.credencial || {}).max_intentos || 0}`}</span>
        }
    },
    {
        title: "Operaciones",
        key: "operaciones",
        render: (value, field) => {
            return (
                <div>
                    <a href="#usuarios-cambios" 
                        onClick={
                            e => {
                                event.fire("open/drawer", {
                                    title: `Usuario: ${field.id}`,
                                    component: <UsuarioDetalles usuario={field} />
                                });
                            }
                        }
                    >modificar</a>
                    <Divider type="vertical" />
                    <a href="#usuarios-baja"
                        onClick={
                            e => {
                                message.error("No tienes los permisos suficientes");
                            }
                        }
                    >eliminar</a>
                </div>
            );
        }
    },
];

export default class Usuario extends React.Component {

    state = {
        data: []
    };

    componentDidMount() {
        this.usuarioRefresh = event.subscribe("usuario/refresh", async () => {
            const data = await UsuarioService.all();

            this.setState({
                data: data.map(field => {
                    field.key = field.id;
                    return field;
                })
            });
        });

        event.fire("usuario/refresh");
    }

    componentWillUnmount() {
        this.usuarioRefresh.unsubscribe();
    }

    render() {

        return (
            <div>
                <h1>Usuarios</h1>
                <Button
                    disabled={!securityService.hasPermission("usuario/alta")}
                    style={{ marginBottom: "20px" }}
                    type="primary"
                    onClick={
                        e => {
                            event.fire("open/drawer", {
                                title: "Nuevo Usuario",
                                component: <UsuarioAlta />
                            });
                        }
                    }>Dar de alta</Button>
                <Table 
                    style={{
                        width: "100%"
                    }} 
                    locale={{
                        emptyText: "No hay registros"
                    }} 
                    columns={columns} 
                    defaultExpandAllRows={true}
                    expandedRowRender={
                        record => {
                            if (!record.perfiles || record.perfiles.length === 0) {
                                return <span>El usuario no tiene perfiles asignados</span>;
                            }
                            return (
                                <div>
                                    <span>Perfiles</span>
                                    <Divider type="vertical" />
                                    {
                                        (record.perfiles || []).map((perfil, index) => (
                                            <Tag color="blue" key={index}>{perfil.nombre}</Tag>
                                        ))
                                    }
                                </div>
                            );
                        }
                    }
                    dataSource={this.state.data}
                />
            </div>
        );

    }

}