import React from 'react';
import OrganisationControl from '../organisation/OrganisationControl';
import StorageControl from '../storage/StorageControl';

import EditableTextField from '../shared/EditableTextField';
import EditableBooleanField from '../shared/EditableBooleanField';

export default class ItemRow extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {name: this.props.item.name,
            description: this.props.item.description,
            notes: this.props.item.notes,
            isAsset: this.props.item.isAsset,
            value: "" + this.props.item.value,
            reference: this.props.item.reference,
            readOnly: true};
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    handleFormSubmit(fieldValue, fieldName) {
        var stateObject = {};
        stateObject[fieldName] = fieldValue;
        stateObject['readOnly'] = true;
        this.setState(stateObject);
    }

    render() {
        return (
            <tr>
                <td><input type="button" value={this.state.readOnly ? 'Edit' : 'Cancel'} onClick={this.onEditHandler} /></td>
                <td><EditableTextField value={this.state.name} field='name' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
                <td><EditableTextField value={this.state.description} field='description' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
                <td><EditableTextField value={this.state.notes} field='notes' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
                <td><EditableBooleanField value={this.state.isAsset} field='isAsset' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
                <td><EditableTextField value={this.state.value} field='value' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
                <td><EditableTextField value={this.state.reference} field='reference' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
                <td><StorageControl storage={this.props.item._links.storage.href}/></td>
                <td><OrganisationControl organisation={this.props.item._links.organisation.href}/></td>
            </tr>
        )
    }
}