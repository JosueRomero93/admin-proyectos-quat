import React from 'react';

import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';

import event from '../../Event';

const FormItem = Form.Item;

const users = [
    {
        user: "dev@quat",
        password: "dev123",
        actions: [
            {
                id: "inicio",
                actions: ["perfil"]
            },
            {
                id: "desarrollo",
                actions: [
                    "bajar-backend-codigo", 
                    "subir-backend-codigo", 
                    "bajar-backend-compilado",
                    "subir-backend-compilado"
                ]
            },
            {
                id: "proyectos",
                actions: ["consultar", "alta"]
            }
        ]
    }
];

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

    login(data) {
        localStorage.setItem("remember", JSON.stringify(data.remember));
        const valid_user = (users.filter(u => {
            return u.user === data.user && u.password === data.password;
        }) || [])[0];
        if (!valid_user) {
            Modal.error({
                title: 'Error al iniciar sesión',
                content: 'Credenciales incorrectas',
            });
            return;
        }
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