import React from "react";
import { Transfer, message } from "antd";

export default class DashboardPerfiles extends React.Component {

    state = {
        user: {},
        profileData: [],
        profileTarget: [],
        disabled: false
    };

    async componentWillMount() {
        await this.getProfiles();
    }

    async componentWillReceiveProps() {
        await this.getProfiles();
    }

    async getProfiles() {
        const url = `${this.props.url}/api/perfil/all`;
        const response = await fetch(url);
        if (!response.ok) {
            message.error("No se pueden obtener los perfiles del servidor");
            return;
        }
        const perfiles = await response.json();

        const user = this.props.data;

        this.setState({
            profileData: perfiles.map(p => ({
                key: p.nombre,
                title: p.nombre,
                chosen: false
            })),
            profileTarget: user.perfiles.map(p => p.nombre)
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
            await this.removePerfiles(moveKeys, nextTargetKeys);
        } else if (direction === "right") {
            await this.addPerfiles(moveKeys, nextTargetKeys);
        }
    }

    async removePerfiles(perfiles, next) {
        const user = this.props.data;

        for (let perfil of perfiles) {
            await this.removePerfil(user.id, perfil);
        }

        this.setState({
            disabled: false,
            profileTarget: next
        });

        if (this.props.onChange) {
            this.props.onChange(user);
        }
    }

    async removePerfil(id_usuario, perfil) {
        const url = `${this.props.url}/api/usuario/remove/perfil?` +
            `id_usuario=${id_usuario}&perfil=${perfil}`;
        const response = await fetch(url);
        if (!response.ok) {
            message.error("Hubo un error al quitar el perfil al usuario");
            return;
        }
    }

    async addPerfiles(perfiles, next) {
        const user = this.props.data;

        for (let perfil of perfiles) {
            await this.addPerfil(user.id, perfil);
        }

        this.setState({
            disabled: false,
            profileTarget: next
        });

        if (this.props.onChange) {
            this.props.onChange(user);
        }
    }

    async addPerfil(id_usuario, perfil) {
        const url = `${this.props.url}/api/usuario/add/perfil?` +
            `id_usuario=${id_usuario}&perfil=${perfil}`;
        const response = await fetch(url);
        if (!response.ok) {
            message.error("Hubo un error al asignar el perfil al usuario");
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
                dataSource={this.state.profileData}
                showSearch
                listStyle={{
                    // width: 250,
                    height: 350,
                }}
                operations={['Agregar', 'Quitar']}
                targetKeys={this.state.profileTarget}
                onChange={this.handleChange}
                render={item => `${item.title}`}
                footer={this.renderFooter}
                disabled={this.state.disabled}
            />
        );
    }

}