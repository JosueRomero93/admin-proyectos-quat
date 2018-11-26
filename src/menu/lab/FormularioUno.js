import React from 'react';

import GenericForm from "../../components/GenericForm";
import { Input } from 'antd';

export default class FormularioUno extends React.Component {

    render() {
        return (
            <GenericForm
                onSubmit={
                    values => {
                        console.log("Formulario Uno:", values);
                    }
                }
                enabled={true}
                buttonLabel="Enviar Formulario Uno"
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