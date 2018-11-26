import React from 'react';
import { Input, DatePicker, message} from 'antd';
import moment from 'moment';
import GenericForm from '../../components/GenericForm';
import proyectoService from '../../service/ProyectoService';
import event from '../../Event';
export default class ProyectoAlta extends React.Component {
    

    render() {
        return (
            <GenericForm
                enabled={true}
                buttonLabel="Crear"
                onSubmit={
                    async (values) => {
                        values.id = 0;

                        values.fecha_inicio = new Date(values.fecha_inicio).toISOString()
                            .replace("T", " ").replace("Z", "");
                        values.fecha_entrega = new Date(values.fecha_entrega).toISOString()
                            .replace("T", " ").replace("Z", "");

                        const result = await proyectoService.create(values);

                        if (!result) {
                            return;
                        }

                        message.success("Proyecto creado exitósamente");
                        event.fire("proyecto/refresh");
                        event.fire("form:reset");
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
                                        message: "Ingresa el nombre del proyecto"
                                    }
                                ]
                            },
                            render: () => (
                                <Input placeholder="Nombre" />
                            )
                        },
                        {
                            name: "descripcion",
                            label: "Descripcion",
                            render: () => (
                                <Input placeholder="Descripcion" />
                            )
                        },
                        {
                            name: "fecha_inicio",
                            label: "Fecha de Inicio",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "Ingresa la fecha de inicio del proyecto"
                                    }
                                ],
                                initialValue: moment(new Date().toLocaleDateString(), "DD/MM/YYYY")
                            },
                            render: () => (
                                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                            )
                        },
                        {
                            name: "fecha_entrega",
                            label: "Fecha de Entrega",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "Ingresa la fecha de entrega del proyecto"
                                    }
                                ],
                                initialValue: moment(new Date().toLocaleDateString(), "DD/MM/YYYY")
                            },
                            render: () => (
                                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                            )
                        },
                        {
                            name: "presupuesto",
                            label: "Presupuesto",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "Ingresa el presupesto del proyecto"
                                    }
                                ]
                            },
                            render: () => (
                                <Input placeholder="Presupuesto" />
                            )
                        },
                        {
                            name: "retorno_esperado",
                            label: "Retorno Esperado",
                            render: () => (
                                <Input placeholder="Retorno Esperado" />
                            )
                        },
                        {
                            name: "activo",
                            label: "Activo",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "Ingresa el estado del proyecto"
                                    }
                                ]
                            },
                            render: () => (
                                <Input placeholder="True/False"/>
                            )
                        }
                    ]
                }
            />
        );
    }

}