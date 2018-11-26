import React from "react";
import { Transfer, message } from "antd";

export default class DashboardRoles extends React.Component {

    state = {
        perfil: {},
        rolData: [],
        rolTarget: [],
        disabled: false
    };

    async componentWillMount() {
        await this.getRoles();
    }

    async componentWillReceiveProps() {
        await this.getRoles();
    }

    async getRoles() {
        const url = `${this.props.url}/api/rol/all`;
        const response = await fetch(url);
        if (!response.ok) {
            message.error("No se pueden obtener los roles del servidor");
            return;
        }
        const roles = await response.json();

        const perfil = this.props.data;

        this.setState({
            rolData: roles.map(p => ({
                key: p.nombre,
                title: p.nombre,
                chosen: false
            })),
            rolTarget: perfil.roles.map(p => p.nombre)
        });
    }

    handleChange = async (nextTargetKeys, direction, moveKeys) => {
        this.setState({ targetKeys: nextTargetKeys });
    
        console.log('targetKeys: ', nextTargetKeys);
        console.log('direction: ', direction);
        console.log('moveKeys: ', moveKeys);

        this.setState({
            disabled: true
        });
        
        if (direction === "left") {
            await this.removeRoles(moveKeys, nextTargetKeys);
        } else if (direction === "right") {
            await this.addRoles(moveKeys, nextTargetKeys);
        }
    }

    async removeRoles(roles, next) {
        const perfil = this.props.data;

        for (let rol of roles) {
            await this.removeRol(perfil.id, rol);
        }

        this.setState({
            disabled: false,
            rolTarget: next
        });

        if (this.props.onChange) {
            this.props.onChange(perfil);
        }
    }

    async removeRol(id_perfil, rol) {
        const url = `${this.props.url}/api/perfil/remove/rol?` +
            `id_perfil=${id_perfil}&rol=${rol}`;
        const response = await fetch(url);
        if (!response.ok) {
            message.error("Hubo un error al quitar el rol al perfil");
            return;
        }
    }

    async addRoles(roles, next) {
        const perfil = this.props.data;

        for (let rol of roles) {
            await this.addPerfil(perfil.id, rol);
        }

        this.setState({
            disabled: false,
            rolTarget: next
        });

        if (this.props.onChange) {
            this.props.onChange(perfil);
        }
    }

    async addPerfil(id_perfil, rol) {
        const url = `${this.props.url}/api/perfil/add/rol?` +
            `id_perfil=${id_perfil}&rol=${rol}`;
        const response = await fetch(url);
        if (!response.ok) {
            message.error("Hubo un error al asignar el rol al perfil");
            return;
        }
    }

    render() {
        return (
            <Transfer
                locale={{
                    itemUnit: 'elemento',
                    itemsUnit: 'elementos',
                    notFoundContent: 'La lista está vacía',
                    searchPlaceholder: 'Buscar aquí'
                }}
                dataSource={this.state.rolData}
                showSearch
                listStyle={{
                    // width: 250,
                    height: 350,
                }}
                operations={['Agregar', 'Quitar']}
                targetKeys={this.state.rolTarget}
                onChange={this.handleChange}
                render={item => `${item.title}`}
                footer={this.renderFooter}
                disabled={this.state.disabled}
            />
        );
    }

}