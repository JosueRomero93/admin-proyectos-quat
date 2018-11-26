import React from "react";

import { message, Popconfirm, Drawer, Col, Row, Form, Input, DatePicker, Button, Icon } from "antd";
import moment from 'moment';
import DashboardPerfiles from "./DashboardPerfiles";
import DashboardRoles from "./DashboardRoles";

const dateFormat = 'DD/MM/YYYY';

// function uuid() {
// 	return Math.random().toString(16).slice(2);
// }

class DashboardDetails extends React.Component {

    state = {
        enabledUpdate: false,
        enabledDelete: false
    };

    componentWillMount() {
        this.setState({
            enabledUpdate: !!this.props.enabledUpdate,
            enabledDelete: !!this.props.enabledDelete
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                message.error("Algunos campos no cumplen la validación");
                return;
            }

            console.log(values);

            const formData = new FormData();

            const mapa = {};

            const data = this.props.data;

            for (let field of this.props.settings.fields) {
                if (field.type === "subkey") {
                    continue;
                }
                mapa[field.key] = values[field.key] || data[field.key] || "";
                if (field.type === "date" && mapa[field.key]) {
                    mapa[field.key] = new Date(mapa[field.key]).toISOString()
                        .replace("T", " ").replace("Z", "");
                }
            }

            console.log(mapa);

            for (let key in mapa) {
                formData.append(key, mapa[key]);
            }
            
            const url = `${this.props.url}${this.props.settings.url.update}`;
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

            this.props.form.resetFields();

            message.success("Registro actualizado");

            if (this.props.onRefresh) {
                this.props.onRefresh();
            }
            this.props.onClose();
        });
    };

    async onDelete() {
        this.props.form.validateFields(async (err, values) => {
            console.log(values);

            const formData = new FormData();

            const mapa = {};

            const data = this.props.data;

            for (let field of this.props.settings.fields) {
                if (field.type === "subkey") {
                    continue;
                }
                mapa[field.key] = values[field.key] || data[field.key] || "";
                if (field.type === "date") {
                    mapa[field.key] = new Date().toISOString()
                        .replace("T", " ").replace("Z", "");
                }
            }

            console.log(mapa);

            for (let key in mapa) {
                formData.append(key, mapa[key]);
            }
            
            const url = `${this.props.url}${this.props.settings.url.delete}`;
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

            this.props.form.resetFields();

            message.success("Registro eliminado");

            if (this.props.onRefresh) {
                this.props.onRefresh();
            }
            this.props.onClose();
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const rows = [];

        let i = 0;

        for (let row of (this.props.settings.details || [])) {
            let col_span = Math.floor(24 / row.length);
            const cols = [];
            for (let col of row) {
                let field = this.props.settings.fields.filter(f => f.key === col)[0];
                if (!field) {
                    continue;
                }
                if (field.type === "catalog") {
                    continue;
                }
                let initialValue = this.props.data[field.key];
                let component = (
                    <Input placeholder={ (field.options || {}).placeholder }
                        disabled={!this.state.enabledUpdate} />
                );
                if (field.type === "date") {
                    component = (
                        <DatePicker style={{ width: "100%" }} 
                            placeholder={ (field.options || {}).placeholder }
                            disabled={!this.state.enabledUpdate}
                            format={dateFormat}/>
                    );
                    if (this.props.data[field.key]) {
                        let date = new Date(this.props.data[field.key]).toLocaleDateString();
                        initialValue = moment(date, dateFormat);
                    }
                } else if (field.type === "credential") {
                    if (field.credentialType === "email") {
                        component = (
                            <Input type="email" disabled={field.disabled} placeholder={ (field.options || {}).placeholder } />
                        );
                        initialValue = (this.props.data.credencial || {}).correo;
                    } else if (field.credentialType === "password") {
                        component = (
                            <Input type="password" disabled={field.disabled} placeholder={ (field.options || {}).placeholder } />
                        );
                        initialValue = (this.props.data.credencial || {}).contraseña;
                    }
                } else if (field.type === "profiles") {
                    component = (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <DashboardPerfiles 
                                onChange={user => {
                                    if (this.props.onRefresh) {
                                        this.props.onRefresh(user);
                                    }
                                    this.props.onClose();
                                }}
                                url={this.props.url} 
                                data={this.props.data} 
                                settings={this.props.settings} />
                        </div>
                    );
                } else if (field.type === "roles") {
                    component = (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <DashboardRoles 
                                onChange={user => {
                                    if (this.props.onRefresh) {
                                        this.props.onRefresh(user);
                                    }
                                    this.props.onClose();
                                }}
                                url={this.props.url} 
                                data={this.props.data} 
                                settings={this.props.settings} />
                        </div>
                    );
                } else if (field.type === "view") {
                    component = (
                        <Input disabled={true} placeholder={ (field.options || {}).placeholder } />
                    );
                    initialValue = (this.props.data[field.key.replace("_view", "")] || {})[field.view];
                }
                if (field.formType === "currency") {
                    component = (
                        <Input type="number" 
                            placeholder={ (field.options || {}).placeholder }
                            prefix={
                                <Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />
                            } disabled={!this.state.enabledUpdate} />
                    );
                } else if (field.formType === "textarea") {
                    component = (
                        <Input.TextArea rows={4}
                            placeholder={ (field.options || {}).placeholder }
                            disabled={!this.state.enabledUpdate} />
                    );
                }
                cols.push(
                    <Col key={`col-${col}`} span={col_span}>
                        <Form.Item label={field.title}>
                            {
                                getFieldDecorator(field.key, {
                                    rules: field.rules || [],
                                    initialValue
                                })(component)
                            }
                        </Form.Item>
                    </Col>
                );
            }
            rows.push(
                <Row key={`row-${i}`} gutter={16}>{cols}</Row>
            );

            i += 1;
         }

        return (
            <Drawer
                title={`${this.props.settings.title} - ID ${this.props.data.id}`.toUpperCase()}
                width={540}
                placement="right"
                onClose={this.props.onClose}
                maskClosable={true}
                visible={this.props.visible}
                style={{
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                }} >
                <Form layout="vertical"
                    onSubmit={this.handleSubmit}>
                    { rows }
                    <div
                        style={{
                        position: 'absolute',
                        display: "flex",
                        justifyContent: "flex-end",
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e8e8e8',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                        }}
                    >
                        <Popconfirm placement="top" title="¿Estás seguro de dar de baja el proyecto?" onConfirm={() => {
                            this.onDelete();
                        }} okText="Si" cancelText="No">
                            <Button style={{ marginRight: 8 }} type="danger"
                                onClick={this.onClose} 
                                disabled={!this.state.enabledDelete}>
                                Dar de Baja
                            </Button>
                        </Popconfirm>
                        <Form.Item>
                            <Button htmlType="submit" type="primary" onClick={this.onClose} 
                                disabled={!this.state.enabledUpdate}>
                                Modificar
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Drawer>
        );
    }
}

const Component = Form.create()(DashboardDetails);

export default Component;