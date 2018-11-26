import React from "react";

import { Select } from 'antd';

import event from "../Event";

const Option = Select.Option;

export default class GenericSelector extends React.Component {

    state = {
        options: []
    };

    async componentWillMount() {
        if (this.props.dataSource) {
            this.setState({
                options: await this.props.dataSource()
            });
        } else if (this.props.options) {
            this.setState({
                options: this.props.options
            });
        }
    }

    render() {
        return (
            <div>
                <Select
                    defaultValue={this.props.defaultValue || null}
                    notFoundContent="No hay elementos"
                    disabled={!this.props.enabled}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder={this.props.placeholder || ""}
                    optionFilterProp="children"
                    onChange={value => {
                        const name = this.props.name || "generic";
                        const select_option = this.state.options.filter(option => {
                            return option.id === value;
                        })[0];
                        event.fire(`selector/${name}`, value,
                            select_option, this.state.options);
                        if (this.props.onSelect) {
                            this.props.onSelect(
                                value,
                                select_option,
                                this.state.options
                            );
                        }
                    }}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    filterOption={(input, option) => 
                        option.props.children
                            .toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        (this.state.options || []).map(option => {
                            return (
                                <Option key={option.id} 
                                    value={option.id}>{option.label}</Option>
                            );
                        })
                    }
                </Select>
            </div>
        );
    }

}