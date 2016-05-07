import React from 'react';
import OrganisationControl from '../organisation/OrganisationControl';
import StorageControl from '../storage/StorageControl';

import EditableTextField from '../shared/EditableTextField';

export default class ItemRow extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {value: this.props.item.name, readOnly: true};
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
                <td>{this.props.item.description}</td>
                <td>{this.props.item.notes}</td>
                <td>{"" + this.props.item.isAsset}</td>
                <td>{"" + this.props.item.value}</td>
                <td>{this.props.item.reference}</td>
                <td><StorageControl storage={this.props.item._links.storage.href}/></td>
                <td><OrganisationControl organisation={this.props.item._links.organisation.href}/></td>
            </tr>
        )
    }
}