import React from 'react';

import { Button, Input } from "antd";

import GenericForm from "../../components/GenericForm";
import event from '../../Event';

export default class FormularioCuatro extends React.Component {

    state = {
        uno: false,
        dos: false
    };

    render() {
        return (
            <GenericForm
                enabled={true}
                buttonLabel="Enviar Formulario Cuatro"
                onSubmit={
                    values => {
                        console.log(values);
                    }
                }
                fields={
                    [
                        {
                            name: "clave-uno",
                            label: "Clave Uno",
                            bind: "clave-uno",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "No se ha generado ninguna clave"
                                    }
                                ],
                                intialValue: this.state.uno
                            },
                            render: (options) => (
                                <Input disabled={true} placeholder="Ingresa una clave aleatoria" />
                            )
                        },
                        {
                            name: "clave-dos",
                            label: "Clave Dos",
                            bind: "clave-dos",
                            options: {
                                rules: [
                                    {
                                        required: true,
                                        message: "No se ha generado ninguna clave"
                                    }
                                ],
                                intialValue: this.state.uno
                            },
                            render: (options) => (
                                <Input disabled={true} placeholder="Ingresa una clave aleatoria" />
                            )
                        },
                        {
                            name: "boton-uno",
                            label: "Generar Clave Uno",
                            render: (options) => (
                                <Button 
                                    onClick={
                                        () => {
                                            const clave = Math.random().toString(16).slice(2);
                                            event.fire("clave-uno", clave);
                                            this.setState({
                                                uno: clave
                                            });
                                        }
                                    }
                                    disabled={!options.enabled}>Generar Clave</Button>
                            )
                        },
                        {
                            name: "boton-dos",
                            label: "Generar Clave Dos",
                            render: (options) => (
                                <Button 
                                    onClick={
                                        () => {
                                            const clave = Math.random().toString(16).slice(2);
                                            event.fire("clave-dos", clave);
                                            this.setState({
                                                uno: clave
                                            });
                                        }
                                    }
                                    disabled={!options.enabled}>Generar Clave</Button>
                            )
                        }
                    ]
                }
            />
        );
    }

}