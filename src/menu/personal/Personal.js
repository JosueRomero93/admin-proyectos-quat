import React from 'react';
import { Table, Divider, Button } from 'antd';
import personalService from '../../service/PersonalService';
import event from '../../Event';
import PersonalDetalles from './PersonalDetalles';
import PersonalAlta from './PersonalAlta';

export default class Personal extends React.Component {

    state = {
        personal: []
    };

    componentWillMount() {
        this.personalRefresh = event.subscribe("personal/refresh", async () => {
            const personal = await personalService.all();

            this.setState({
                personal: personal.map(persona => {
                    persona.key = persona.id;
                    return persona;
                })
            });
        });

        event.fire("personal/refresh");
    }

    componentWillUnmount() {
        this.personalRefresh.unsubscribe();
    }

    render() {
        return (
            <div>
                <h1>Personal</h1>
                <Button type="primary"
                    style={{
                        marginBottom: "20px"
                    }}
                    onClick={
                        () => {
                            event.fire("open/drawer", {
                                title: "Personal Nuevo",
                                component: <PersonalAlta />
                            });
                        }
                    }
                >Dar de Alta</Button>
                <Table 
                    expandedRowRender={
                        persona => {
                            return (
                                <div>
                                    <p>{`RFC: ${persona.rfc || "No definido"}`}</p>
                                    <p>{`CRUP: ${persona.curp || "No definido"}`}</p>
                                    <p>{`Estatus: ${persona.estatus || "No definido"}`}</p>
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
                                title: "Apellido Paterno",
                                key: "ap_paterno",
                                dataIndex: "ap_paterno",
                            },
                            {
                                title: "Apellido Materno",
                                key: "ap_materno",
                                dataIndex: "ap_materno",
                            },
                            {
                                title: "Fecha de Ingreso",
                                key: "fecha_ingreso",
                                dataIndex: "fecha_ingreso",
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
                                render: (value, persona) => {
                                    return (
                                        <div>
                                            <a href="#opciones"
                                                onClick={
                                                    () => {
                                                        event.fire("open/drawer", {
                                                            title: `Modificar personal con Id: ${persona.id}`,
                                                            component: <PersonalDetalles persona={persona} />
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
                    dataSource={ this.state.personal }
                />
            </div>
        );
    }

}