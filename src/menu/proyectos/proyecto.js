import React from 'react';
import { Table, Divider, Button } from 'antd';
import proyectoService from '../../service/ProyectoService';
import event from '../../Event';
import ProyectoAlta from './ProyectoAlta';
import ProyectoDetalles from './ProyectoDetalles';

export default class Proyecto extends React.Component {

    state = {
        proyectos: []
    };

    componentWillMount() {
        this.proyectoRefresh = event.subscribe("proyecto/refresh", async () => {
            const proyecto = await proyectoService.all();
            this.setState({
                proyecto: proyecto.map(proyecto => {
                    proyecto.key = proyecto.id;
                    return proyecto;
                })
            });
        });

        event.fire("proyecto/refresh");
    }

    componentWillUnmount() {
        this.proyectoRefresh.unsubscribe();
    }

    render() {
        return (
            <div>
                <h1>Proyecto</h1>
                <Button type="primary"
                    style={{
                        marginBottom: "20px"
                    }}
                    onClick={
                        () => {
                            event.fire("open/drawer", {
                                title: "Proyecto Nuevo",
                                component: <ProyectoAlta/>
                            });
                        }
                    }
                >Dar de Alta</Button>
                <Table 
                    expandedRowRender={
                        proyecto => {
                            return (
                                <div>
                                    <p>{`Descripcion: ${proyecto.descripcion || "No definido"}`}</p>
                                    <p>{`Presupuesto: ${proyecto.presupuesto || "No definido"}`}</p>
                                    <p>{`Retorno Esperado: ${proyecto.retorno_esperado || "No definido"}`}</p>
                                    <p>{`Activo: ${proyecto.activo || "No definido"}`}</p>
                                </div>
                            )
                        }
                    }
                    columns={
                        [
                            {
                                title: "Id",
                                key: "id",
                                dataIndex: "id"
                            },
                            {
                                title: "Nombre",
                                key: "nombre",
                                dataIndex: "nombre"
                            },
                            {
                                title: "Fecha de Inicio",
                                key: "fecha_inicio",
                                dataIndex: "fecha_inicio",
                                render: fecha => {
                                    if (!fecha) {
                                        return <span>No hay fecha de ingreso</span>;
                                    }
                                    fecha = new Date(fecha);
                                    return <span>{`${fecha.toLocaleDateString()}`}</span>;
                                }
                            },
                            {
                                title: "Fecha de Entrega",
                                key: "fecha_entrega",
                                dataIndex: "fecha_entrega",
                                render: fecha => {
                                    if (!fecha) {
                                        return <span>No hay fecha de ingreso</span>;
                                    }
                                    fecha = new Date(fecha);
                                    return <span>{`${fecha.toLocaleDateString()}`}</span>;
                                }
                            },
                            {
                                title: "Opciones",
                                key: "opciones",
                                render: (value, proyecto) => {
                                    return (
                                        <div>
                                            <a href="#opciones"
                                                onClick={
                                                    () => {
                                                        event.fire("open/drawer", {
                                                            title: `Modificar proyecto con Id: ${proyecto.id}`,
                                                            component: <ProyectoDetalles proyecto={proyecto}/>
                                                        });
                                                    }
                                                }
                                            >modificar</a>
                                            <Divider type="vertical" />
                                            <a href="#opciones">eliminar</a>
                                        </div>
                                    );
                                }
                            }
                        ]
                    }
                    dataSource={ this.state.proyecto }
                />
            </div>
        );
    }

}