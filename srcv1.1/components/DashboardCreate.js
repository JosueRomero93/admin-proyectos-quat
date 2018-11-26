import React from "react";

import { message, Select, Drawer, Col, Row, Form, Input, DatePicker, Button, Icon } from "antd";
// import moment from 'moment';

const Option = Select.Option;

const dateFormat = 'DD/MM/YYYY';

// function uuid() {
// 	return Math.random().toString(16).slice(2);
// }

class DashboardCreate extends React.Component {
    
    state = {
        catalog: []
    };

    async componentWillMount() {
        if (this.props.settings.catalog) {
            await this.getCatalogos();
        }
    }

    async getCatalogos() {
        const url = `${this.props.url}${this.props.settings.catalog.all}`;
        const response = await fetch(url);
        if (!response.ok) {
            message.error("No se puede obtener el catálogo");
            return;
        }
        const data = await response.json();
        
        this.setState({
            catalog: data
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

            for (let field of this.props.settings.fields) {
                mapa[field.key] = values[field.key] || "";
                if (field.type === "date" && mapa[field.key]) {
                    mapa[field.key] = new Date(mapa[field.key]).toISOString()
                        .replace("T", " ").replace("Z", "");
                } 
            }

            mapa.id = "0";

            console.log(mapa);

            for (let key in mapa) {
                formData.append(key, mapa[key]);
            }
            
            const url = `${this.props.url}${this.props.settings.url.create}`;
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

            message.success("Registro creado");

            if (this.props.onRefresh) {
                this.props.onRefresh();
            }
        });
    };

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
                let initialValue = null;
                let component = (
                    <Input disabled={field.disabled} placeholder={ (field.options || {}).placeholder } />
                );
                if (field.bind) {
                    initialValue = this.state[field.bind];
                }
                if (field.type === "date") {
                    component = (
                        <DatePicker style={{ width: "100%" }} 
                            placeholder={ (field.options || {}).placeholder }
                            format={dateFormat}/>
                    );
                    // if (this.props.data[field.key]) {
                    //     let date = new Date(this.props.data[field.key]).toLocaleDateString();
                    //     initialValue = moment(date, dateFormat);
                    // }
                } else if (field.type === "credential") {
                    if (field.credentialType === "email") {
                        component = (
                            <Input type="email" disabled={field.disabled} placeholder={ (field.options || {}).placeholder } />
                        );
                    } else if (field.credentialType === "password") {
                        component = (
                            <Input type="password" disabled={field.disabled} placeholder={ (field.options || {}).placeholder } />
                        );
                    }
                } else if (field.type === "view") {
                    continue;
                } else if (field.type === "profiles") {
                    continue;
                } else if (field.type === "roles") {
                    continue;
                } else if (field.type === "catalog") {
                    component = (
                        <Select
                            showSearch
                            // style={{ width: 200 }}
                            placeholder="Seleccionar Proyecto"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            // onFocus={handleFocus}
                            // onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {
                                this.state.catalog.map(c => {
                                    return (
                                        <Option key={c.id} value={c.id}>{c.nombre}</Option>
                                    );
                                })
                            }
                        </Select>
                    );
                }
                if (field.formType === "currency") {
                    component = (
                        <Input type="number" 
                            placeholder={ (field.options || {}).placeholder }
                            prefix={
                                <Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />
                            } />
                    );
                } else if (field.formType === "textarea") {
                    component = (
                        <Input.TextArea rows={4}
                            placeholder={ (field.options || {}).placeholder } />
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
                title={`${this.props.settings.title} - Alta`.toUpperCase()}
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
                    onSubmit={this.handleSubmit}
                    >
                    { rows }
                    <div
                        style={{
                            position: 'absolute',
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
                        <Form.Item>
                            <Button htmlType="submit" type="primary" 
                                onClick={this.onClose} >
                                Dar de Alta
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Drawer>
        );
    }
}

const Component = Form.create()(DashboardCreate);

export default Component;