import React from 'react';

import Dashboard from "../Dashboard";

const settings = {
	title: "Insumos",
	url: {
		all: "/api/insumo/all",
		create: "/api/insumo/create",
		update: "/api/insumo/update",
		delete: "/api/insumo/delete",
	},
	details: [
		["insumo"],
	],
	fields: [
		{
			title: "ID",
			key: "id",
			type: "text",
		},
		{
			title: "Insumo",
			key: "insumo",
			type: "tag",
			formType: "currency",
		},
		{
			title: "Descripción",
			key: "descripcion",
			type: "text",
			formType: "textarea"
		},
	]
};

export default class InsumoDashboard extends React.Component {
	
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