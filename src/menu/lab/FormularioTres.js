import React from 'react';

import { message, Button } from "antd";

import GenericForm from "../../components/GenericForm";
import event from '../../Event';

export default class FormularioTres extends React.Component {

    state = {
        activo: false
    };

    render() {
        return (
            <GenericForm
                enabled={true}
                buttonLabel="Enviar Formulario Tres"
                onSubmit={
                    values => {
                        console.log(values);
                    }
                }
                fields={
                    [
                        {
                            name: "activo",
                            label: "Activar",
                            bind: "activar",
                            options: {
                                initialValue: this.state.activo
                            },
                            render: () => (
                                <Button onClick={
                                    () => {
                                        const activo = !this.state.activo;
                                        if (activo) {
                                            message.success("Activando");
                                        } else {
                                            message.warning("Desactivando");
                                        }
                                        event.fire("activar", activo);
                                        this.setState({
                                            activo
                                        });
                                    }
                                }>{ this.state.activo ? "Desactivar" : "Activar" }</Button>
                            )
                        }
                    ]
                }
            />
        );
    }

}