import React from 'react';

import Dashboard from "../Dashboard";

const settings = {
	title: "Gastos",
	showAlways: true,
	url: {
		all: "/api/gasto/all",
		create: "/api/gasto/create",
		update: "/api/gasto/update",
		delete: "/api/gasto/delete",
	},
	catalog: {
		all: "/api/proyecto/all"
	},
	details: [
		["proyecto_id"],
		["proyecto_view"],
		["tipo", "monto"],
		["forma_pago_requerido"],
		["descripcion"],
	],
	fields: [
		{
			title: "ID",
			key: "id",
			type: "text",
		},
		{
			title: "Proyecto",
			key: "proyecto_id",
			type: "catalog",
			permissions: ["system:hidden"]
		},
		{
			title: "Proyecto",
			key: "proyecto_view",
			type: "view",
			view: "nombre",
			permissions: ["system:hidden"]
		},
		{
			title: "Proyecto",
			key: "proyecto",
			type: "subkey",
			subkey: "nombre",
			sort: "text",
			options: {
				tagColor: "purple"
			}
		},
		{
			title: "Tipo",
			key: "tipo",
			type: "text",
		},
		{
			title: "Forma de Pago Requerido",
			key: "forma_pago_requerido",
			type: "text",
		},
		{
			title: "Monto",
			key: "monto",
			type: "tag",
			sort: "number",
			formType: "currency",
			options: {
				tagColor: "purple",
				placeholder: "Monto"
			},
		},
		{
			title: "Descripción",
			key: "descripcion",
			type: "text",
			formType: "textarea"
		},
	]
};

export default class GastoDashboard extends React.Component {
	
	render() {
        return (
			<Dashboard url={this.props.url} 
				settings={ settings }
				permissions={{
					create: "gasto/alta",
					details: "gasto/detalles",
					update: "gasto/modificar",
					delete: "gasto/baja",
				}} />
        );
    }

  }