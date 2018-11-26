import React from 'react';
import { Input, DatePicker, message } from 'antd';
import moment from 'moment';
import GenericForm from '../../components/GenericForm';
import personalService from '../../service/PersonalService';
import event from '../../Event';

export default class PersonalAlta extends React.Component {

    render() {
        return (
            <GenericForm
                enabled={true}
                buttonLabel="Crear"
                onSubmit={
                    async (values) => {
                        values.id = 0;

                        values.fecha_ingreso = new Date(values.fecha_ingreso).toISOString()
                            .replace("T", " ").replace("Z", "");

                        const result = await personalService.create(values);

                        if (!result) {
                            return;
                        }

                        message.success("Personal creado exitósamente");
                        event.fire("personal/refresh");
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
                                        message: "Ingresa el nombre del personal"
                                    }
                                ]
                            },
                            render: () => (
                                <Input placeholder="Nombre" />
                            )
                        },
                        {
                            name: "ap_paterno",
                            label: "Apellido Paterno",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "Ingresa el apellido paterno del personal"
                                    }
                                ]
                            },
                            render: () => (
                                <Input placeholder="Apellido Paterno" />
                            )
                        },
                        {
                            name: "ap_materno",
                            label: "Apellido Materno",
                            render: () => (
                                <Input placeholder="Apellido Materno" />
                            )
                        },
                        {
                            name: "rfc",
                            label: "RFC",
                            render: () => (
                                <Input placeholder="RFC" />
                            )
                        },
                        {
                            name: "curp",
                            label: "CURP",
                            render: () => (
                                <Input placeholder="CURP" />
                            )
                        },
                        {
                            name: "fecha_ingreso",
                            label: "Fecha de Ingreso",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "Ingresa la fecha de ingreso del personal"
                                    }
                                ],
                                initialValue: moment(new Date().toLocaleDateString(), "DD/MM/YYYY")
                            },
                            render: () => (
                                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                            )
                        },
                        {
                            name: "estatus",
                            label: "Estatus",
                            render: () => (
                                <Input.TextArea placeholder="Estatus" />
                            )
                        },
                    ]
                }
            />
        );
    }

}