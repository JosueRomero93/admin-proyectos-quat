import React from 'react';

import Dashboard from "../Dashboard";

const settings = {
	title: "Proyectos",
	url: {
		all: "/api/proyecto/all",
		create: "/api/proyecto/create",
		update: "/api/proyecto/update",
		delete: "/api/proyecto/delete",
	},
	details: [
		["nombre", "presupuesto"],
		["fecha_inicio", "fecha_entrega"],
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
					message: 'Ingresa el nombre del proyecto'
				}
			],
			options: {
				placeholder: "Nombre"
			}
		},
		{
			title: "Presupuesto",
			key: "presupuesto",
			type: "tag",
			sort: "number",
			formType: "currency",
			options: {
				tagColor: "purple",
				placeholder: "Presupuesto"
			},
			rules: [
				{
					required: true,
					message: 'Ingresa el prepuesto del proyecto'
				},
				{
					validator: (rule, value, callback) => {
						if (Number(value) > 0) {
							callback();
							return;
						}
						callback("Inválido");
					},
					message: "El presupuesto tiene que ser mayor a cero"
				}
			],
			permissions: ["administrador"],
		},
		{
			title: "Fecha de Inicio",
			key: "fecha_inicio",
			type: "date",
			sort: "date",
			options: {
				placeholder: "Fecha de Inicio"
			},
			rules: [
				{
					required: true,
					message: 'Ingresa la fecha de inicio del proyecto'
				}
			],
		},
		{
			title: "Fecha de Entrega",
			key: "fecha_entrega",
			type: "date",
			sort: "date",
			options: {
				placeholder: "Fecha de Enrega"
			},
			rules: [
				{
					required: true,
					message: 'Ingresa la fecha de entrega del proyecto'
				}
			],
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

export default class ProyectoDashboard extends React.Component {
	
	render() {
        return (
			<Dashboard url={this.props.url} 
				settings={ settings }
				permissions={{
					create: "proyecto/alta",
					details: "proyecto/detalles",
					update: "proyecto/modificar",
					delete: "proyecto/baja",
				}} />
        );
    }

  }