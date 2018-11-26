import React from "react";

import { Button, Table, message, Divider } from "antd";

import event from "../../Event";
import RolAlta from "./RolAlta";
import RolService from "../../service/RolService";
import RolDetalles from "./RolDetalles";

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
        title: "Permiso",
        key: "permiso",
        dataIndex: "permiso",
        render: (permiso) => {
            return <span>{permiso}</span>;
        }
    },
    {
        title: "Descripción",
        key: "descripcion",
        dataIndex: "descripcion",
        render: (descripcion) => {
            return <span>{descripcion}</span>;
        }
    },
    {
        title: "Operaciones",
        key: "operaciones",
        render: (value, field) => {
            return (
                <div>
                    <a href="#roles-cambios" 
                        onClick={
                            e => {
                                event.fire("open/drawer", {
                                    title: `Rol: ${field.id}`,
                                    component: <RolDetalles rol={field} />
                                });
                            }
                        }
                    >modificar</a>
                    <Divider type="vertical" />
                    <a href="#roles-baja"
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

export default class Rol extends React.Component {

    state = {
        data: []
    };

    componentDidMount() {
        this.rolRefresh = event.subscribe("rol/refresh", async () => {
            const data = await RolService.all();

            this.setState({
                data: data.map(field => {
                    field.key = field.id;
                    return field;
                })
            });
        });

        event.fire("rol/refresh");
    }

    componentWillUnmount() {
        this.rolRefresh.unsubscribe();
    }

    render() {

        return (
            <div>
                <h1>Roles</h1>
                <Button style={{ marginBottom: "20px" }}
                    type="primary"
                    onClick={
                        e => {
                            event.fire("open/drawer", {
                                title: "Nuevo Rol",
                                component: <RolAlta />
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
                    pagination={{
                        pageSize: 7
                    }}
                    columns={columns} 
                    dataSource={this.state.data}
                />
            </div>
        );

    }

}