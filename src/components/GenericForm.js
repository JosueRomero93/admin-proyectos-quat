import React from "react";

import { Form, Button, message } from 'antd';

import event from "../Event";

const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class GenericFormComponent extends React.Component {

    componentDidMount() {
        const fields = this.props.fields || [];

        this.binds = [];

        fields.map(field => {
            if (field.bind) {
                const suscriber = event.subscribe(field.bind, value => {
                    if (field.bindMap) {
                        value = field.bindMap(value);
                    }
                    console.log("bind", value);
                    this.props.form.setFieldsValue({
                        [field.name]: value
                    });
                });
                this.binds.push(suscriber);
            }
            return null;
        });

        // To disabled submit button at the beginning.
        this.props.form.validateFields();

        this.formResetEvent = event.subscribe("form:reset", () => {
            this.props.form.resetFields();
        });
    }

    componentWillUnmount() {
        this.binds.map(suscriber => {
            suscriber.unsubscribe();
            return null;
        });
        this.formResetEvent.unsubscribe();
    }

    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;

        const enabled = this.props.enabled;

        return (
            <Form onSubmit={
                (e) => {
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (err) {
                            message.error("Algunos campos no son válidos");
                            return;
                        }
                        //message.info("Enviando formulario");
                        //console.log(values);
                        const name = this.props.name || "generic";
                        event.fire(`form/${name}`, values);

                        if (this.props.onSubmit) {
                            this.props.onSubmit(values);
                        }
                    });
                }
            }>
                {
                    (this.props.fields || []).map(field => {
                        const errorField = isFieldTouched(field.name) && 
                            getFieldError(field.name);

                        const formField = getFieldDecorator(field.name, field.options || {})(field.render({
                            enabled
                        }));
                        return (
                            <FormItem
                                key={field.name}
                                validateStatus={errorField ? 'error' : ''}
                                help={errorField || ''}
                                label={field.label}
                                // disabled={!enabled}
                            >{ formField }</FormItem>
                        );
                    })
                }
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={ 
                            !enabled ||
                            hasErrors(getFieldsError())
                        }
                    >
                    { this.props.buttonLabel || "enviar" }
                    </Button>
              </FormItem>
            </Form>
          );
    }

}

const GenericForm = Form.create()(GenericFormComponent);

export default GenericForm;