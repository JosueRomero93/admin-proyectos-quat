import React from 'react';

import GenericForm from "../../components/GenericForm";
import { Input, message } from 'antd';
import gastoService from '../../service/GastoService';
import event from '../../Event';

export default class GastoDetalles extends React.Component {

    render() {
        return (
            <div>
                <GenericForm
                    enabled={true}
                    buttonLabel="Guardar"
                    onSubmit={
                        async (values) => {
                            values.id = this.props.gasto.id;
                            await gastoService.update(values);
                            message.success("Gasto actualizado correctamente");
                            event.fire("gasto/refresh");
                            //event.fire("form:reset");
                        }
                    }
                    fields={
                        [
                            {
                                name: "nombre_proyecto",
                                label: "Nombre del Proyecto",
                                options: {
                                    rules: [
                                        {
                                            required: true,
                                            enable: false,
                                            message: "Ingresa el tipo de gasto"
                                        }
                                    ],
                                    initialValue: this.props.gasto.proyecto.nombre
                                },
                                render: () => (
                                    <Input placeholder="Tipo" disabled="true" />
                                )
                            },
                            {
                                name: "tipo",
                                label: "Tipo",
                                options: {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Ingresa el tipo de gasto"
                                        }
                                    ],
                                    initialValue: this.props.gasto.tipo
                                },
                                render: () => (
                                    <Input placeholder="Tipo" />
                                )
                            },
                            {
                                name: "descripcion",
                                label: "Descripcion",
                                options: {
                                    initialValue: this.props.gasto.descripcion || "No definido"
                                },
                                render: () => (
                                    <Input placeholder="Descripcion" />
                                )
                            },
                            {
                                name: "forma_pago_requerido",
                                label: "Forma de pago",
                                options: {
                                    initialValue: this.props.gasto.forma_pago_requerido || "No definido"
                                },
                                render: () => (
                                    <Input placeholder="Forma de pago" />
                                )
                            },
                            {
                                name: "monto",
                                label: "Monto",
                                options: {
                                    initialValue: this.props.gasto.monto || "No definido"
                                },
                                render: () => (
                                    <Input placeholder="Monto" />
                                )
                            },
                        ]
                    }
                />
            </div>
        );
    }

}