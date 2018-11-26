import React from "react";

import { Form, Input, Button } from "antd";

function uuid() {
	return Math.random().toString(16).slice(2);
}

class CredentialCreator extends React.Component {

    state = {
        credentialId: ""
    };

    render() {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "150px"
            }}>
                <Input disabled={this.state.credentialId} placeholder="Correo" />
                <Input disabled={this.state.credentialId} type="password" placeholder="Contraseña" />
                <Button disabled={this.state.credentialId} onClick={e => {
                    this.setState({credentialId: uuid()})
                }} type="primary">Crear Credenciales</Button>
                <Button disabled={!this.state.credentialId} onClick={e => {
                    this.setState({credentialId: ""})
                }} type="danger">Eliminar Credenciales</Button>
            </div>
        );
    }

}

const Component = Form.create(CredentialCreator);

export default Component;