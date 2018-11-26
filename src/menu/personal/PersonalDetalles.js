import React from 'react';

import GenericForm from "../../components/GenericForm";
import { Input, DatePicker, message } from 'antd';
import moment from 'moment';
import personalService from '../../service/PersonalService';
import event from '../../Event';

export default class PersonalDetalles extends React.Component {

    render() {
        return (
            <div>
                <GenericForm
                    enabled={true}
                    buttonLabel="Guardar"
                    onSubmit={
                        async (values) => {
                            values.id = this.props.persona.id;
                            values.fecha_ingreso = new Date(values.fecha_ingreso).toISOString()
                                .replace("T", " ").replace("Z", "");
                            await personalService.update(values);
                            message.success("Personal actualizado correctamente");
                            event.fire("personal/refresh");
                            //event.fire("form:reset");
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
                                    ],
                                    initialValue: this.props.persona.nombre
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
                                    ],
                                    initialValue: this.props.persona.ap_paterno
                                },
                                render: () => (
                                    <Input placeholder="Apellido Paterno" />
                                )
                            },
                            {
                                name: "ap_materno",
                                label: "Apellido Materno",
                                options: {
                                    initialValue: this.props.persona.ap_materno || "No definido"
                                },
                                render: () => (
                                    <Input placeholder="Apellido Materno" />
                                )
                            },
                            {
                                name: "rfc",
                                label: "RFC",
                                options: {
                                    initialValue: this.props.persona.rfc || "No definido"
                                },
                                render: () => (
                                    <Input placeholder="RFC" />
                                )
                            },
                            {
                                name: "curp",
                                label: "CURP",
                                options: {
                                    initialValue: this.props.persona.curp || "No definido"
                                },
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
                                    initialValue: moment(new Date(this.props.persona.fecha_ingreso || new Date()).toLocaleDateString(), "DD/MM/YYYY")
                                },
                                render: () => (
                                    <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                                )
                            },
                            {
                                name: "estatus",
                                label: "Estatus",
                                options: {
                                    initialValue: this.props.persona.estatus || "No definido"
                                },
                                render: () => (
                                    <Input.TextArea placeholder="Estatus" />
                                )
                            },
                        ]
                    }
                />
            </div>
        );
    }

}