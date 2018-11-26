import React from "react";
//componentes usarndo de ans
import { Form, Input, Icon, Button ,DatePicker, message } from 'antd';
//metodo a usar 
const FormItem = Form.Item;
//importar clase
class ProyectoAlta extends React.Component {
   
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                message.error("Algunos campos no cumplen la validación");
                return;
            }
            const formData = new FormData();

            const mapa = {
                id: "0",
                nombre: values.nombre,
                descripcion: values.descripcion,
                fecha_inicio: values.fecha_inicio.toISOString()
                    .replace("T", " ").replace("Z", ""),
                fecha_entrega: values.fecha_entrega.toISOString()
                    .replace("T", " ").replace("Z", ""),
                presupuesto: values.presupuesto,
            };

            for (let key in mapa) {
                formData.append(key, mapa[key]);
            }
            
            const url = `${this.props.url}/api/proyecto/create`;
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

            message.success("Proyecto Creado");
        });
    };

    render (){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form style={{
                width: "400px"
            }} layout="horizontal" onSubmit={this.handleSubmit}>
                <h1>Alta de Proyectos</h1>
                <FormItem label="Nombre">
                {
                    getFieldDecorator('nombre', {
                        rules: [{
                            required: true,
                            message: 'Ingresa el nombre del proyecto'
                        }]
                    })(<Input placeholder="Nombre" />)
                }
                </FormItem>
                <FormItem label="Descripción">
                    {
                        getFieldDecorator('descripcion', {
                            rules: [{
                                required: true,
                                message: 'Ingresa la descripción del proyecto'
                            }]
                        })(<Input placeholder="Descripcion" />)
                    }
                </FormItem>
                <FormItem label="Fecha de Inicio">
                    {
                        getFieldDecorator('fecha_inicio', {
                            rules: [{
                                required: true,
                                message: 'Ingresa la fecha de inicio del proyecto'
                            }]
                        })(<DatePicker style={{ width: "100%" }} 
                                placeholder="Fecha de inicio"/>)
                    }
                </FormItem>
                <FormItem label="Fecha de Entrega">
                    {
                        getFieldDecorator('fecha_entrega', {
                            rules: [{
                                required: true,
                                message: 'Ingresa la fecha de entrega del proyecto'
                            }]
                        })(<DatePicker style={{ width: "100%" }} 
                                placeholder="Fecha de entrega"/>)
                    }
                </FormItem>
                <FormItem label="Presupuesto">
                    {
                        getFieldDecorator('presupuesto', {
                            rules: [{
                                required: true,
                                message: 'Ingresa el presupuesto del proyecto'
                            }, {
                                validator: (rule, value, callbak) => {
                                    if (Number(value) > 0) {
                                        callbak();
                                        return;
                                    }
                                    callbak("Inválido");
                                },
                                message: 'Ingresa un número positivo'
                            }]
                        })(<Input type="number" placeholder="Presupuesto"
                            prefix={
                                <Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />
                            } />)
                    }
                </FormItem>
                <FormItem>
                    <Button style={{
                        width: "100%"
                    }} type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </FormItem>
            </Form>
        );
    }

}

const form = Form.create()(ProyectoAlta);

export default form;