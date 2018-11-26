import React from 'react';
import GenericForm from "../../components/GenericForm";
import { Input, DatePicker, message } from 'antd';
import moment from 'moment';
import proyectoService from '../../service/ProyectoService';
import event from '../../Event';

export default class ProyectoDetalles extends React.Component {

    render() {
        return (
            <div>
                <GenericForm
                    enabled={true}
                    buttonLabel="Guardar"
                    onSubmit={
                        async (values) => {
                            values.id = this.props.proyecto.id;
                            values.fecha_inicio = new Date(values.fecha_inicio).toISOString()
                                .replace("T", " ").replace("Z", "");
                            values.fecha_entrega = new Date(values.fecha_entrega).toISOString()
                                .replace("T", " ").replace("Z", "");
                            await proyectoService.update(values);
                            message.success("Proyecto actualizado correctamente");
                            event.fire("proyecto/refresh");
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
                                    ],
                                    initialValue: this.props.proyecto.nombre
                                },
                                render: () => (
                                    <Input placeholder="Nombre" />
                                )
                            },
                            {
                                name: "descripcion",
                                label: "Descripcion",
                                options: {
                                    initialValue: this.props.proyecto.descripcion
                                },
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
                                    initialValue: moment(new Date(this.props.proyecto.fecha_inicio || new Date()).toLocaleDateString(),"DD/MM/YYYY")
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
                                    initialValue: moment(new Date(this.props.proyecto.fecha_entrega || new Date()).toLocaleDateString(),"DD/MM/YYYY")
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
                                    ],
                                    initialValue: this.props.proyecto.presupuesto
                                    
                                },
                                render: () => (
                                    <Input placeholder="Presupuesto" />
                                )
                            },
                            {
                                name: "retorno_esperado",
                                label: "Retorno Esperado",
                                options: {
                                    initialValue: this.props.proyecto.retorno_esperado || "No definido"
                                },
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
                                    ],
                                    initialValue: this.props.proyecto.activo
                                },
                                render: () => (
                                    <Input placeholder="True/False"/>
                                )
                            }
                        ]
                    }
                />
            </div>
        );
    }

}