import React from 'react';

import Dashboard from "../Dashboard";

const settings = {
	title: "Puestos",
	url: {
		all: "/api/puesto/all",
		create: "/api/puesto/create",
		update: "/api/puesto/update",
		delete: "/api/puesto/delete",
	},
	details: [
		["nombre"],
		["caracteristicas"],
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
		},
		{
			title: "Características",
			key: "caracteristicas",
			type: "text",
			formType: "textarea"
		},
	]
};

export default class PuestoDashboard extends React.Component {
	
	render() {
        return (
			<Dashboard url={this.props.url} 
				settings={ settings }
				permissions={{
					create: true,
					view: true,
					update: false,
					delete: false,
					admin: true,
				}} />
        );
    }

  }