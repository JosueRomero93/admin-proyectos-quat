import React from 'react';
import GenericSelector from '../../components/GenericSelector';

export default class SelectorUno extends React.Component {

    render() {
        return (
            <GenericSelector
                enabled={true}
                onSelect={
                    id => {
                        console.log(id);
                    }
                }
                options={
                    [
                        {
                            id: "a",
                            label: "A"
                        },
                        {
                            id: "b",
                            label: "B"
                        }
                    ]
                }
            />
        );
    }

}