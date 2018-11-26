import React from 'react';
import { Table, Divider, Button } from 'antd';
import gastoService from '../../service/GastoService';
import event from '../../Event';
import GastoDetalles from './GastoDetalles';
import GastoAlta from './GastoAlta';
//import PersonalAlta from './PersonalAlta';

export default class Gasto extends React.Component {

    state = {
        gasto: []
    };

    componentWillMount() {
        this.gastoRefresh = event.subscribe("gasto/refresh", async () => {
            const gasto = await gastoService.all();

            this.setState({
                gasto: gasto.map(gast => {
                    gast.key = gast.id;
                    return gast;
                })
            });
        });

        event.fire("gasto/refresh");
    }

    componentWillUnmount() {
        this.gastoRefresh.unsubscribe();
    }

    render() {
        return (
            <div>
                <h1>Gastos</h1>
                <Button type="primary"
                    style={{
                        marginBottom: "20px"
                    }}
                    onClick={
                        () => {
                            event.fire("open/drawer", {
                                title: "Nuevo Gasto",
                                component:<GastoAlta/>
                            });
                        }
                    }
                >Dar de Alta</Button>
                <Table 
                    expandedRowRender={
                        gast => {
                            return (
                                <div>
                                    <p>{`Tipo: ${gast.tipo || "No definido"}`}</p>
                                    <p>{`Descripcion: ${gast.descripcion || "No definido"}`}</p>
                                    <p>{`Forma de pago: ${gast.forma_pago_requerido|| "No definido"}`}</p>
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
                                title: "Nombre del Proyecto",
                                key: "proyecto_nombre",
                                dataIndex: "proyecto.nombre"
                            },
                            {
                                title: "Monto",
                                key: "monto",
                                dataIndex: "monto",
                            },
                            {
                                title: "Opciones",
                                key: "opciones",
                                render: (value, gasto) => {
                                    return (
                                        <div>
                                            <a href="#opciones"
                                                onClick={
                                                    () => {
                                                        event.fire("open/drawer", {
                                                            title: `Modificar personal con Id: ${gasto.id}`,
                                                            component: <GastoDetalles gasto={gasto}/>
                                                            //<PersonalDetalles persona={persona} />
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
                    dataSource={ this.state.gasto }
                />
            </div>
        );
    }

}