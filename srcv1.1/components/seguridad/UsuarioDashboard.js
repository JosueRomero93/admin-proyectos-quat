import React from 'react';

import Dashboard from "../Dashboard";

const settings = {
	title: "Usuarios",
	url: {
		all: "/api/usuario/all",
		create: "/api/usuario/create",
		update: "/api/usuario/update",
		delete: "/api/usuario/delete",
	},
	details: [
		["correo"],
		["contraseña"],
		["id_credencial"],
		["perfiles"],
	],
	fields: [
		{
			title: "ID",
			key: "id",
			type: "text",
		},
		{
			title: "Correo",
			key: "credencial",
			type: "credential",
			options: {
				tagColor: "green"
			},
		},
		{
			title: "Correo",
			key: "correo",
			type: "credential",
			credentialType: "email",
			options: {
				tagColor: "green",
				placeholder: "Correo"
			},
			permissions: ["void0"],
			rules: [
				{
					required: true,
					message: 'Ingresa el correo del usuario'
				}
			]
		},
		{
			title: "Contraseña",
			key: "contraseña",
			type: "credential",
			credentialType: "password",
			options: {
				tagColor: "green",
				placeholder: "Contraseña"
			},
			permissions: ["void0"],
			rules: [
				{
					required: true,
					message: 'Ingresa la contraseña del usuario'
				}
			]
		},
		{
			title: "Perfiles",
			key: "perfiles",
			type: "profiles",
			options: {
				tagColor: "purple"
			}
		},
	]
};

export default class UsuarioDashboard extends React.Component {
	
	render() {
        return (
			<Dashboard url={this.props.url} 
				settings={ settings }
				permissions={{
					create: "usuario/alta",
					details: "usuario/detalles",
					update: "usuario/modificar",
					delete: "usuario/baja",
				}} />
        );
    }

  }