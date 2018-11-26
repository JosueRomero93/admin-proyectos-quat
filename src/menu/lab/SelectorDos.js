import React from 'react';
import GenericSelector from '../../components/GenericSelector';
import Service from '../../service/Service';

export default class SelectorDos extends React.Component {

    render() {
        return (
            <GenericSelector
                enabled={true}
                onSelect={
                    id => {
                        console.log(id);
                    }
                }
                dataSource={
                    async () => {
                        const service = new Service();

                        const users = await service.get("https://randomuser.me/api?results=500");

                        return users.results.map(user => {
                            return {
                                id: user.login.uuid,
                                label: `${user.name.first} ${user.name.last}`
                            };
                        });
                    }
                }
            />
        );
    }

}