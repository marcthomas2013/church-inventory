import React from 'react';
import StorageControl from './StorageControl';

import EditableTextField from '../shared/EditableTextField';

export default class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {value: this.props.storage.name, readOnly: true};
    }

    handleFormSubmit(fieldValue, fieldName) {
        this.setState({value: fieldValue, readOnly: true});
    }

    render() {
        return (
            <tr>
                <td><EditableTextField value={this.state.value} field='storage' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
            </tr>
        )
    }
}