import React from 'react';

import { Transfer } from 'antd';
import event from '../Event';

export default class GenericTransfer extends React.Component {

    state = {
        items: [],
        selectedKeys: [],
        selectedItems: []
    };

    async componentWillMount() {
        if (this.props.dataSource) {
            const items = await this.props.dataSource();
            const selectedItems = items.filter(item => item.chosen);
            const selectedKeys = selectedItems.map(item => item.key);
            this.setState({
                items,
                selectedItems,
                selectedKeys
            });
        }
    }

    render() {
        return (
            <div>
                <p>{this.props.title}</p>
                <Transfer
                    listStyle={{ width: "calc(50% - 25px)" }}
                    dataSource={this.state.items}
                    showSearch
                    targetKeys={this.state.selectedKeys}
                    render={item => item.title}
                    filterOption={
                        (value, item) => {
                            return `${item.title}`.toLowerCase().indexOf(`${value}`.toLowerCase()) > -1;
                        }
                    }
                    onChange={
                        (selectedKeys, direction) => {
                            const selectedItems = this.state.items
                                .filter(item => selectedKeys.indexOf(item.key) >= 0);

                            this.setState({ 
                                selectedKeys,
                                selectedItems
                            });
                            
                            const name = this.props.name || "generic";
                            event.fire(`transfer/${name}`, selectedItems);

                            if (this.props.onTransfer) {
                                this.props.onTransfer(selectedItems);
                            }

                            if (direction === "left") {
                                event.fire(`transfer/${name}:left`, selectedItems);

                                if (this.props.onLeft) {
                                    this.props.onLeft(selectedItems);
                                }
                            } else {
                                event.fire(`transfer/${name}:right`, selectedItems);

                                if (this.props.onRight) {
                                    this.props.onRight(selectedItems);
                                }
                            }
                        }
                    }
                    disabled={!this.props.enabled}
                    locale={{ 
                        itemUnit: 'elemento', 
                        itemsUnit: 'elementos',
                        notFoundContent: 'No hay elementos', 
                        searchPlaceholder: 'buscar...' 
                    }}
                />
            </div>
        );
    }

}