import React from 'react';

import { Table, Icon, Select, Input, Tag, message } from 'antd';

const Option = Select.Option;

function uuid() {
	return Math.random().toString(16).slice(2);
}

const columns = [{
	title: 'ID',
    dataIndex: 'id',
	key: 'id',
    render: text => (
		<span>
			<a href="javascript:;">{text}</a>
		</span>
	),
}, {
    title: 'Nombre',
	dataIndex: 'nombre',
	key: 'nombre',
	render: text => <span>{text}</span>
}, {
    title: 'Descripcion',
    dataIndex: 'descripcion',
	key: 'descripcion',
	render: text => <span>{text}</span>
},
{
    title: 'Fecha de inicio',
    dataIndex: 'fecha_inicio',
	key: 'fecha_inicio', 
	render: fecha => {
		const date = new Date(Number(fecha));
		return <span>{date.toLocaleDateString()}</span>;
	}
},
{
	title: 'Fecha de entrega',
    dataIndex: 'fecha_entrega',
	key: 'fecha_entrega',
	render: fecha => {
		const date = new Date(Number(fecha));
		return <span>{date.toLocaleDateString()}</span>;
	}
},
{
    title: 'Presupuesto',
    key: 'presupuesto',
    dataIndex: 'presupuesto',
    render: presupuesto => (
      	<span>
			<Tag color="purple">
				{presupuesto}
			</Tag>
      	</span>
    ),
}, {
    title: 'Acciones',
	key: 'action',
    render: (text, record) => (
    	<span>
        	<a href="javascript:;">Detalles</a>
      	</span>
    ),
}];

export default class ProyectoConsulta extends React.Component {

	state = {
		data: []
	};

	async componentWillMount() {
		try {
			const url = `${this.props.url}/api/proyecto/all`;
			const response = await fetch(url);
			if (!response.ok) {
				message.error("No se pueden obtener los datos del servidor");
				const text = await response.text();
				console.log(text);
				return;
			}
			const data = await response.json();
			this.setState({
				data: data.map(d => Object.assign({ key: uuid() }, d))
			});
		} catch(e) {
			message.error("No se pueden obtener los datos del servidor");
		}
	}

    render() {
        return (
            <div style={{
				padding: "20px",
				overflowY: "auto"
			}}>
				<h1 style={{
					textAlign: "center"
				}}>Proyectos</h1>
				<div style={{
					marginBottom: "30px"
				}}>
					<Input placeholder="buscar..."
						suffix={
							<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />
						}
						addonAfter={
							<Select defaultValue="por id" style={{ 
								textAlign: "center",
								width: 180 
							}}>
								<Option value="id">por id</Option>
								<Option value="nombre">por nombre</Option>
								<Option value="descripcion">descripcion</Option>
								<Option value="fecha_inicio">fecha de inicio</Option>
								<Option value="fecha_entrega">fecha de entrega</Option>
								<Option value="presupuesto">presupuesto</Option>
							</Select>
					} />
				</div>
				<Table columns={columns} 
					dataSource={this.state.data}
					pagination={{
						pageSize: 5
					}} />
			</div>
        );
    }

  }