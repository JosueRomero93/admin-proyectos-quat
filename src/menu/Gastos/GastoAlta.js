import React from 'react';
import { Input, message,InputNumber } from 'antd';

import GenericForm from '../../components/GenericForm';
import gastoService from '../../service/GastoService';
import event from '../../Event';
import GenericSelector from '../../components/GenericSelector';
import proyectoService from '../../service/ProyectoService';

export default class GastoAlta extends React.Component {
    state = {
        gastos:[],
        mis_gastos: []
    };
    render() {
        return (
            <div>

            <GenericForm
                enabled={true}
                buttonLabel="Crear"
                onSubmit={
                    async (values) => {
                        values.id = 0;
                        const result = await gastoService.create(values);

                        if (!result) {
                            return;
                        }

                        message.success("Gasto creado exitósamente");
                        event.fire("gasto/refresh");
                        event.fire("form:reset");
                    }
                }
                

                fields={
                    [
                        {
                            name: "tipo",
                            label: "tipo",
                            
                            render: () => (
                                <Input placeholder="Tipo" />
                            )
                        },
                        {
                            name: "proyecto_id",
                            label: "Proyecto",
                            bind: "selector/proyecto_id",
                           options:{
                               rules:[
                                   {
                                       required: true,
                                       message:"ingrese el proyecto asociado"
                                   }
                               ]
                           },
                            render: (options) => {
                                return (
                                    <GenericSelector
                                    name="proyecto_id"
                                    enabled={options.enabled}
                                    onSelect={
                                        (id, proyecto) => {
                                            const mis_gastos = this.state.gastos.filter(gasto => {
                                                return gasto.proyecto.id === id;
                                            });
                
                                            console.log(mis_gastos);
                
                                            this.setState({
                                                mis_gastos
                                            });
                                        }
                                    }
                                    dataSource={
                                        
                                        async () => {
                                            
                                            const proyecto = await proyectoService.all();
                                            return proyecto.map(proyecto => {
                                                return {
                                                    id: proyecto.id,
                                                    label: proyecto.id,
                                                    proyecto
                                                };
                                            })
                                            
                                        }
                                        
                                    }
                                
                                />
                                );
                            }
                        },
                        {
                            name: "descripcion",
                            label: "Descripcion",
                            
                            render: () => (
                                <Input placeholder="Descripcion" />
                            )
                        },
                        {
                            name: "forma_pago_requerido",
                            label: "Forma de pago",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "Ingrese su Forma de pago"
                                    }
                                ]
                            },
                            render: () => (
                                <Input placeholder="Forma de pago" />
                            )
                        },
                        {
                            name: "monto",
                            label: "MONTO",
                            render: () => (
                                <InputNumber placeholder="MONTO" />
                            )
                        }
                    ]
                }
            />
            </div>
        );
    }

}