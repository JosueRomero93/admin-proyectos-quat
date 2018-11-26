import React from 'react';

import Dashboard from "../Dashboard";

const settings = {
	title: "Roles",
	showAlways: true,
	url: {
		all: "/api/rol/all",
		create: "/api/rol/create",
		update: "/api/rol/update",
		delete: "/api/rol/delete",
	},
	details: [
		["nombre"],
		["permiso"],
		["descripcion"],
	],
	fields: [
		{
			title: "ID",
			key: "id",
			type: "text",
			sort: "number",
		},
		{
			title: "Nombre",
			key: "nombre",
			type: "text",
			sort: "text",
			rules: [
				{
					required: true,
					message: 'Ingresa el nombre del rol'
				}
			],
			options: {
				placeholder: "Nombre"
			}
		},
		{
			title: "Clave",
			key: "permiso",
			type: "text",
			sort: "text",
			rules: [
				{
					required: true,
					message: 'Ingresa la clave del rol'
				}
			],
			options: {
				placeholder: "Clave"
			}
		},
		{
			title: "Descripción",
			key: "descripcion",
			type: "text",
			formType: "textarea",
			sort: "text"
		},
	]
};

export default class RolesDashboard extends React.Component {
	
	render() {
        return (
			<Dashboard url={this.props.url} 
				settings={ settings }
				permissions={{
					create: "rol/alta",
					details: "rol/detalles",
					update: "rol/modificar",
					delete: "rol/baja",
				}} />
        );
    }

  }