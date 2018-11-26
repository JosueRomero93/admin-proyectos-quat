import React from 'react';

import Dashboard from "../Dashboard";

const settings = {
	title: "Perfiles",
	showAlways: true,
	url: {
		all: "/api/perfil/all",
		create: "/api/perfil/create",
		update: "/api/perfil/update",
		delete: "/api/perfil/delete",
	},
	details: [
		["nombre"],
		["descripcion"],
		["roles"],
	],
	fields: [
		{
			title: "ID",
			key: "id",
			type: "text",
		},
		{
			title: "Nombre",
			key: "nombre",
			type: "text",
			rules: [
				{
					required: true,
					message: 'Ingresa el nombre del proyecto'
				}
			],
			options: {
				placeholder: "Nombre"
			}
		},
		{
			title: "Descripción",
			key: "descripcion",
			type: "text",
			formType: "textarea",
		},
		{
			title: "Roles",
			key: "roles",
			type: "roles",
			options: {
				tagColor: "purple"
			}
		},
	]
};

export default class PerfilesDashboard extends React.Component {
	
	render() {
        return (
			<Dashboard url={this.props.url} 
				settings={ settings }
				permissions={{
					create: "perfil/alta",
					details: "perfil/detalles",
					update: "perfil/modificar",
					delete: "perfil/eliminar",
				}} />
        );
    }

  }