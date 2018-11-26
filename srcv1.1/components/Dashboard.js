import React from 'react';

import { Button, Table, Icon, Select, Input, Tag, message } from 'antd';

import DashboardCreate from "./DashboardCreate";
import DashboardDetails from "./DashboardDetails";

const Option = Select.Option;

// function uuid() {
// 	return Math.random().toString(16).slice(2);
// }

const sorters = {
	text: (a, b) => {
		const x = `${a}`.toLowerCase();
		const y = `${b}`.toLowerCase();
		if (x < y) {
			return 1;
		} else if (x > b) {
			return -1;
		}
		return x.length - y.length;
	},
	number: (a, b) => {
		return a - b;
	},
	date: (a, b) => {
		return a - b;
	}
};

export default class Dashboard extends React.Component {
	state = {
		visible: false,
		visibleCreate: false,
		selectedRecord: {},
		data: [],
		filterData: [],
		filter: false,
		searchType: "id",
	};

	columns = [];

	permissions = [];
	user_permissions = [];

	check(permission) {
		return this.user_permissions.indexOf(permission) >= 0;
	}

	constructor(props) {
		super(props);

		this.user_permissions = JSON.parse(
			sessionStorage.getItem("permissions") || "[]"
		);

		for (let key in this.props.permissions) {
			if (this.props.permissions[key]) {
				this.permissions.push(this.props.permissions[key]);
			}
		}

		// console.log(this.permissions);

		this.columns = this.props.settings.fields
			.filter(field => {
				if (!field.permissions) {
					return true;
				}
				let pass = true;
				for (let key of field.permissions) {
					if (this.user_permissions.indexOf(key) < 0) {
						pass = false;
					}
				}
				return pass;
			})
			.map(field => {
				const column = {
					title: field.title,
					dataIndex: field.key,
					key: field.key,
					render: (text) => (
						<span>{text}</span>
					),
				};
				if (field.type === "date") {
					column.render = (date) => (
						<span>{new Date(Number(date)).toLocaleDateString()}</span>
					);
				} else if (field.type === "tag") {
					column.render = (text) => (
						<span style={{ textAlign: "center", width: "100%" }}>
							<Tag color={(field.options || {}).tagColor || "red"}>
								{text}
							</Tag>
						</span>
					);
				} else if (field.type === "credential") {
					if(field.credentialType) {
						column.render = () => (<span>{field.credentialType}</span>);
					} else {
						column.render = (text) => (
							<span style={{ textAlign: "center", width: "100%" }}>
								<Tag color={(field.options || {}).tagColor || "red"}>
									{text.correo}
								</Tag>
							</span>
						);
					}
				} else if (field.type === "profiles") {
					column.render = (perfiles) => (
						<span style={{ textAlign: "center", width: "100%" }}>
							{
								perfiles.map((perfil) => {
									return (
										<Tag key={perfil.id} color={(field.options || {}).tagColor || "red"}>
											{perfil.nombre}
										</Tag>
									)
								})
							}
						</span>
					);
				} else if (field.type === "roles") {
					column.render = (roles) => (
						<span style={{ textAlign: "center", width: "100%" }}>
							{
								roles.map((rol) => {
									return (
										<Tag key={rol.id} color={(field.options || {}).tagColor || "red"}>
											{rol.nombre}
										</Tag>
									)
								})
							}
						</span>
					);
				} else if (field.type === "subkey") {
					column.render = (data) => {
						if (!data) {
							return (
								<span style={{ textAlign: "center", width: "100%" }}>
									<Tag color="red">
										No Definido
									</Tag>
								</span>
							);
						}
						return (
							<span style={{ textAlign: "center", width: "100%" }}>
								<Tag color={data.activo ? (field.options || {}).tagColor || "red" : "red"}>
									{data[field.subkey]}
								</Tag>
							</span>
						);
					};
				}

				const sorter = sorters[field.sort];
				if (field.sort && sorter) {
					column.sorter = (a, b) => {
						a = a[field.key];
						b = b[field.key];
						return sorter(a, b);
					};
				}
				return column;
			});

		if (this.check(this.props.permissions.details) || 
			this.check(this.props.permissions.update) ||
			this.check(this.props.permissions.delete)) {
			this.columns.push({
				title: 'Detalles',
				key: 'action-view',
				render: (text, record) => {
					return (
						<span>
							<a href="#app" onClick={() => this.showDrawer()}>Ver detalles</a>
						</span>
					);
				},
			});
		}
	}

	showDrawer() {
		//console.log("open Drawer", this.state.selectedRecord);
	  	this.setState({
			visible: true,
	  	});
	};
  
	onClose = () => {
		this.setState({
			visible: false,
			visibleCreate: false
	  	});
	};

	async componentWillMount() {
		await this.onRefresh();
	}

	async onRefresh(user) {
		try {
			const url = `${this.props.url}${this.props.settings.url.all}`;
			const response = await fetch(url);

			if (!response.ok) {
				message.error("No se pueden obtener los datos del servidor");
				// const text = await response.text();
				// console.log(text);
				return;
			}
			const data = await response.json();
			const update = {
				data: data.map(d => Object.assign({ key: d.id }, d))
			};
			if (user) {
				update.selectedRecord = user;
			}
			this.setState(update);
		} catch(e) {
			message.error("No se pueden obtener los datos del servidor");
		}
	}

	selectRecord(record) {
		// console.log(record);
		this.setState({
			selectedRecord: record
		});
	};

	search(value) {
		console.log("buscando", value);
		if (!value) {
			this.setState({
				filter: false
			});
			return;
		}

		let filterData = [];

		const key = this.state.searchType;
		
		filterData = this.state.data.filter(field => {
			return `${field[key]}`.toLowerCase().search(value.toLowerCase()) >= 0;
		}).filter(field => {
			return this.props.settings.showAlways ? true : field.activo;
		});

		this.setState({
			filter: true,
			filterData
		});
		return;

		// if (filterData.length > 0) {
		// 	this.setState({
		// 		filter: true,
		// 		filterData
		// 	});
		// 	return;
		// }
		// this.setState({
		// 	filter: false
		// });
	}

    render() {
		
        return (
            <div style={{
				width: "100%",
				padding: "20px",
				overflowY: "auto"
			}}>
				<h1 style={{ textAlign: "center" }}>{this.props.settings.title}</h1>
				<div style={{ margin: "30px 0px" }}>
					<Button type="primary"
						disabled={!this.check(this.props.permissions.create)}
						onClick={
							() => {
								this.setState({
									visible: false,
									visibleCreate: true
								});
							}
						}>Dar de alta</Button>
				</div>
				<div style={{
					marginBottom: "30px"
				}}>
					<Input placeholder="buscar..."
						onChange={(e) => this.search(e.target.value)}
						suffix={
							<Icon type="search" style={{ 
								color: 'rgba(0,0,0,.25)' 
							}} />
						}
						addonAfter={
							<Select defaultValue="por id" style={{ 
								textAlign: "center",
								width: 180 
							}} onChange={e => {
								this.setState({
									searchType: e
								});
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
				
				<Table columns={this.columns} 
					locale={{
						filterConfirm: 'Aceptar',
						filterReset: 'Reniciar',
						emptyText: 'No hay resultados' 
					}}
					dataSource={this.state.filter ? this.state.filterData : (
						(this.state.all || this.props.settings.showAlways) ? this.state.data : this.state.data.filter(field => field.activo)
					)}
					onRow={(record) => ({
						onClick: () => {
							this.selectRecord(record);
						}
					})}
					pagination={{
						pageSize: 5
					}} />

				<DashboardDetails
					url={this.props.url}
					onRefresh={() => this.onRefresh()}
					settings={this.props.settings}
					visible={this.state.visible}
					onClose={() => this.onClose()}
					data={this.state.selectedRecord}
					enabledUpdate={this.check(this.props.permissions.update)}
					enabledDelete={this.check(this.props.permissions.delete)} />

				<DashboardCreate
					url={this.props.url}
					onRefresh={() => this.onRefresh()}
					settings={this.props.settings}
					visible={this.state.visibleCreate}
					onClose={() => this.onClose()}
					data={this.state.selectedRecord}
					/>				

			</div>
			
        );
	}

  }