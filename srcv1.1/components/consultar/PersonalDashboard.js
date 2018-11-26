import React from 'react';

import Dashboard from "../Dashboard";

const settings = {
	title: "Personal",
	url: {
		all: "/api/personal/all",
		create: "/api/personal/create",
		update: "/api/personal/update",
		delete: "/api/personal/delete",
	},
	details: [
		["nombre", "ap_paterno", "ap_materno"],
		["rfc", "curp"],
		["fecha_ingreso"],
		["estatus"],
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
					message: 'Ingresa el nombre'
				}
			]
		},
		{
			title: "Apellido Paterno",
			key: "ap_paterno",
			type: "text",
			sort: "text",
			rules: [
				{
					required: true,
					message: 'Ingresa el apellido paterno'
				}
			]
		},
		{
			title: "Apellido Materno",
			key: "ap_materno",
			type: "text",
			sort: "text",
			rules: [
				{
					required: true,
					message: 'Ingresa el apellido materno'
				}
			]
		},
		{
			title: "RFC",
			key: "rfc",
			type: "tag",
			sort: "text",
			options: {
				tagColor: "blue"
			},
		},
		{
			title: "CURP",
			key: "curp",
			type: "tag",
			sort: "text",
			options: {
				tagColor: "green"
			},
		},
		{
			title: "Fecha de Ingreso",
			key: "fecha_ingreso",
			type: "date",
			sort: "date"
		},
		{
			title: "Estatus",
			key: "estatus",
			type: "text",
			sort: "text",
			formType: "textarea"
		},
	]
};

export default class PersonalDashboard extends React.Component {
	
	render() {
        return (
			<Dashboard url={this.props.url} 
				settings={ settings }
				permissions={{
					create: "personal/alta",
					details: "personal/detalles",
					update: "personal/modificar",
					delete: "personal/baja",
				}} />
        );
    }

  }