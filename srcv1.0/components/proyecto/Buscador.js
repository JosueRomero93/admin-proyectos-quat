import React from "react";
//componentes usarndo de ans
import { Form, Input, Button ,DatePicker} from 'antd';
//metodo a usar 
const FormItem = Form.Item;
//importar clase

const config = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
  };

export default class Buscador extends React.Component {
   
    render (){
        return (
           
            
       <Form layout="inline" onSubmit={this.handleSubmit}>
        <h1>Buscador</h1>
        <FormItem>
        
            <Input Buscador  placeholder="buscador" />
           
        </FormItem>
    
        <FormItem>
        
            <Input Buscador2  placeholder="buscador2" />
        </FormItem>

        <FormItem>
        
             <Input Buscador3 placeholder="buscador3"/>
        </FormItem>

        <FormItem>
             
        <Button type="primary" htmlType="submit">
              Enviar Datos
        </Button>
        
        </FormItem>

      </Form>
    
        );
        

    }

    }
