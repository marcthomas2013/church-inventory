import React from 'react';
import OrganisationControl from './OrganisationControl';

import EditableTextField from '../shared/EditableTextField';

export default class Organisation extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {value: this.props.organisation.name, readOnly: true};
    }

    handleFormSubmit(fieldValue, fieldName) {
        this.setState({value: fieldValue, readOnly: true});
    }

    render() {
        return (
            <tr>
                <td><EditableTextField value={this.state.value} field='organisation' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
            </tr>
        )
    }
}