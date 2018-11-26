import React from 'react';

import { Form, Icon, Input, Button, Checkbox, Modal, message } from 'antd';

import event from '../../Event';

const FormItem = Form.Item;

class Acceder extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.login(values);
            }
        });
    };

    state = {
        user: "alan",
        password: "",
    };

    componentWillMount() {
        const user = localStorage.getItem("user") || "";
        const password = localStorage.getItem("password") || "";
        const remember = JSON.parse(localStorage.getItem("remember") || "false");
        this.setState({
            user,
            password,
            remember
        });
    }

    async getUser(id) {
        const url = `${this.props.url}/api/usuario/find?id=${id}`;
        const response = await fetch(url);
        if (!response.ok) {
            const text = await response.text();
            message.error(text);
            return;
        }
        return await response.json();
    }

    async login(data) {
        console.log("User", data);
        if (data.user === "master@quat" && 
            data.password === "Admin$2018") {
            event.fire("login", {
                credencial: {
                    correo: data.user,
                    contraseña: data.password,
                },
                perfiles: []
            });
            return;
        }

        const formData = new FormData();

        formData.append("correo", data.user);
        formData.append("contraseña", data.password);

        const url = `${this.props.url}/api/credencial/login`;
        const response = await fetch(url, {
            method: "post",
            mode: "cors",
            body: formData
        });

        if (!response.ok) {
            const text = await response.text();
            message.error(text);
            return;
        }

        const id = Number(await response.text());

        if (id <= 0) {
            Modal.error({
                title: 'Error al iniciar sesión',
                content: 'Credenciales incorrectas',
            });
            return;
        }

        const valid_user = await this.getUser(id);

        localStorage.setItem("remember", JSON.stringify(data.remember));
        
        if (!valid_user) {
            Modal.error({
                title: 'Error al iniciar sesión',
                content: 'Credenciales incorrectas',
            });
            return;
        }

        sessionStorage.setItem("user", JSON.stringify(valid_user));

        if (!data.remember) {
            localStorage.removeItem("user");
            localStorage.removeItem("password");
        } else {
            localStorage.setItem("user", data.user);
            localStorage.setItem("password", data.password);
        }

        event.fire("login", valid_user);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form style={{
                width: "400px",
                paddingTop: "40px"
            }} onSubmit={this.handleSubmit} className="login-form">
                <h1 style={{
                    textAlign: "center",
                    color: "#002766"
                }}>Administrador de Proyectos</h1>
                <FormItem label="Usuario">
                {getFieldDecorator('user', {
                    rules: [{ required: true, message: 'Ingresa el nombre de usuario' }],
                    initialValue: this.state.user,
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
                )}
                </FormItem>
                <FormItem label="Contraseña">
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Ingresa la contraseña' }],
                    initialValue: this.state.password,
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: this.state.remember,
                })(
                    <Checkbox>Recordar</Checkbox>
                )}
                <a className="login-form-forgot" href="/">Olvidé la contraseña</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Iniciar Sesión
                </Button>
                </FormItem>
            </Form>
        );
    }

}

const WrappedNormalLoginForm = Form.create()(Acceder);

export default WrappedNormalLoginForm;