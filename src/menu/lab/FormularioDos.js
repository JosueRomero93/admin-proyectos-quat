import React from 'react';

import { message } from "antd";

import GenericForm from "../../components/GenericForm";
import { Input } from 'antd';
import event from '../../Event';

export default class FormularioDos extends React.Component {

    componentWillMount() {
        this.formEvent = event.subscribe("form/formulario-usuario", values => {
            message.success(`Se han recibido los datos del formulario usuario: ` +
                `${JSON.stringify(values)}`);
        });
    }

    componentWillUnmount() {
        this.formEvent.unsubscribe();
    }

    render() {
        return (
            <GenericForm
                name="formulario-usuario"
                enabled={true}
                buttonLabel="Enviar Formulario Dos"
                fields={
                    [
                        {
                            name: "nombre",
                            label: "Nombre",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "Ingresa el nombre"
                                    }
                                ]
                            },
                            render: (options) => (
                                <Input placeholder="Ingresa el nombre" />
                            )
                        },
                        {
                            name: "edad",
                            label: "Edad",
                            options: {
                                initialValue: 20
                            },
                            render: () => (
                                <Input type="number" placeholder="Ingresa la edad" />
                            )
                        }
                    ]
                }
            />
        );
    }

}