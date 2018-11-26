import React from 'react';
import GenericSelector from '../../components/GenericSelector';
import Service from '../../service/Service';

export default class SelectorUsuarios extends React.Component {

    state = {
        users: [],
        selectUser: {}
    };

    render() {
        return (
            <div>
                <p>{`Total de usuarios: ${this.state.users.length}`}</p>
                <GenericSelector 
                    enabled={true}
                    onSelect={
                        uuid => {
                            const user = this.state.users.filter(user => {
                                return user.login.uuid === uuid;
                            })[0];
                            if (user) {
                                this.setState({
                                    selectUser: user
                                });
                            }
                        }
                    }
                    dataSource={
                        async () => {
                            const service = new Service();

                            const response = await service.get("https://randomuser.me/api?results=50");

                            const users = response.results;

                            this.setState({
                                users
                            });

                            return users.map(user => ({
                                id: user.login.uuid,
                                label: `${user.name.title} ${user.name.first} ${user.name.last}`
                            }));
                        }
                    }
                />
                <p>{`Usuario seleccionado: ${JSON.stringify(this.state.selectUser)}`}</p>
                <img src={(this.state.selectUser.picture || {}).large} />
            </div>
        );
    }

}