import React from 'react';

import { Input, Select, Tag, Divider } from 'antd';

const Option = Select.Option;

const colors = [
    "red", "blue", "green", "yellow",
    "orange", "magenta", "cyan", "gold",
    "geekblue", "volcano", "purple", "lime",
];

export default class InputTag extends React.Component {

    state = {
        selectedKey: "id",
        filters: [
            {
                key: "id",
                value: "1"
            }
        ]
    };

    render() {
        return (
            <div>
                <Input 
                    onPressEnter={
                        e => {
                            const filters = this.state.filters;
                            filters.push({
                                key: this.state.selectedKey,
                                value: e.target.value
                            });
                            this.setState({
                                filters
                            });
                            e.target.value = "";
                        }
                    }
                    addonAfter={
                        <Select defaultValue="id" 
                            onChange={
                                key => {
                                    this.setState({
                                        selectedKey: key
                                    })
                                }
                            }
                            style={{
                            width: `${"descripción".length * 11}px`
                            }}
                        >
                            <Option value="id">id</Option>
                            <Option value="nombre">nombre</Option>
                            <Option value="descripcion">descripción</Option>
                        </Select>
                    }
                />
                <Divider />
                <div>
                    {
                        this.state.filters.map((filter, i) => {
                            return (
                                <Tag key={i} closable 
                                    onClose={
                                        () => {
                                            const filters = this.state.filters;
                                            filters.splice(i, 0);
                                            this.setState({
                                                filters
                                            });
                                        }
                                    }
                                    color={colors[i % colors.length]}>{`${filter.key}: ${filter.value}`}</Tag>
                            );
                        })
                    }
                </div>
            </div>
        );
    }

}