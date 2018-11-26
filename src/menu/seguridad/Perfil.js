import React from "react";

import { Button, Table, Tag, Divider, message } from "antd";

import event from "../../Event";
import PerfilAlta from "./PerfilAlta";
import PerfilService from "../../service/PerfilService";
import PerfilDetalles from "./PerfilDetalles";

const columns = [
    {
        title: "Id",
        key: "id",
        dataIndex: "id"
    },
    {
        title: "Nombre",
        key: "nombre",
        dataIndex: "nombre",
        render: (nombre) => {
            return <span>{nombre}</span>;
        }
    },
    {
        title: "Descripción",
        key: "descripcion",
        dataIndex: "descripcion",
        render: (descripcion) => {
            return <span>{descripcion}</span>
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
                                    title: `Perfil: ${field.id}`,
                                    component: <PerfilDetalles perfil={field} />
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

export default class Perfil extends React.Component {

    state = {
        data: []
    };

    componentDidMount() {
        this.perfilRefresh = event.subscribe("perfil/refresh", async () => {
            const data = await PerfilService.all();

            this.setState({
                data: data.map(field => {
                    field.key = field.id;
                    return field;
                })
            });
        });

        event.fire("perfil/refresh");
    }

    componentWillUnmount() {
        this.perfilRefresh.unsubscribe();
    }

    render() {

        return (
            <div>
                <h1>Perfiles</h1>
                <Button style={{ marginBottom: "20px" }}
                    type="primary"
                    onClick={
                        e => {
                            event.fire("open/drawer", {
                                title: "Nuevo Perfil",
                                component: <PerfilAlta />
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
                            if (!record.roles || record.roles.length === 0) {
                                return <span>El perfil no tiene roles asignados</span>;
                            }
                            return (
                                <div>
                                    <span>Roles</span>
                                    <Divider type="vertical" />
                                    {
                                        (record.roles || []).map((rol, index) => (
                                            <Tag color="blue" key={index}>{rol.nombre}</Tag>
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