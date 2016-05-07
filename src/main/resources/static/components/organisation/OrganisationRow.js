import React from 'react';
import OrganisationControl from './OrganisationControl';

import EditableTextField from '../shared/EditableTextField';

export default class Organisation extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {value: this.props.organisation.name, readOnly: true};
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    handleFormSubmit(fieldValue) {
        this.setState({value: fieldValue, readOnly: true});
    }

    render() {
        return (
            <tr>
                <td><input type="button" value={this.state.readOnly ? 'Edit' : 'Cancel'} onClick={this.onEditHandler} /></td>
                <td><EditableTextField value={this.state.value} readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
            </tr>
        )
    }
}