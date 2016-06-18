import React from 'react';
import OrganisationControl from '../organisation/OrganisationControl';
import StorageControl from '../storage/StorageControl';

import EditableTextField from '../shared/EditableTextField';
import EditableBooleanField from '../shared/EditableBooleanField';

export default class ItemRow extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);

        this.state = {originalName: this.props.item.name, newName: this.props.item.name,
            originalDescription: this.props.item.description, newDescription: this.props.item.description,
            originalNotes: this.props.item.notes, newNotes: this.props.item.notes,
            originalIsAsset: this.props.item.isAsset, newIsAsset: this.props.item.isAsset,
            originalValue: "" + this.props.item.value, newValue: "" + this.props.item.value,
            originalReference: this.props.item.reference, newReference: this.props.item.reference,
            readOnly: true};
    }

    onCancelHandler() {
        this.setState({originalName: this.state.originalName, newName: this.state.originalName,
            originalDescription: this.state.originalDescription, newDescription: this.state.originalDescription,
            originalNotes: this.state.originalNotes, newNotes: this.state.originalNotes,
            originalIsAsset: this.state.originalIsAsset, newIsAsset: this.state.originalIsAsset,
            originalValue: "" + this.state.originalValue, newValue: "" + this.state.originalValue,
            originalReference: this.state.originalReference, newReference: this.state.originalReference,
            readOnly: true});
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    onChangeHandler(fieldValue, fieldName) {
        var stateObject = {};
        fieldName = "new" + fieldName;
        stateObject[fieldName] = fieldValue;
        this.setState(stateObject);
    }

    onSuccessHandler(e) {
        this.setState({originalName: this.state.newName, newName: this.state.newName,
            originalDescription: this.state.newDescription, newDescription: this.state.newDescription,
            originalNotes: this.state.newNotes, newNotes: this.state.newNotes,
            originalIsAsset: this.state.newIsAsset, newIsAsset: this.state.newIsAsset,
            originalValue: "" + this.state.newValue, newValue: "" + this.state.newValue,
            originalReference: this.state.newReference, newReference: this.state.newReference,
            readOnly: true});

    }

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span></td>
                    <td><EditableTextField value={this.state.originalName} field='Name' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.originalDescription} field='Description' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.originalNotes} field='Notes' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableBooleanField value={this.state.originalIsAsset} field='IsAsset' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.originalValue} field='Value' readOnly={this.state.readOnly} visible={this.state.originalIsAsset} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.originalReference} field='Reference' readOnly={this.state.readOnly} visible={this.state.originalIsAsset} onChangeHandler={this.onChangeHandler} /></td>
                    <td><StorageControl storage={this.props.item._links.storage.href}/></td>
                    <td><OrganisationControl organisation={this.props.item._links.organisation.href}/></td>
                </tr>
            )
        } else {
            return (
                <tr className="success">
                    <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
                        <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
                    <td><EditableTextField value={this.state.newName} field='Name' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.newDescription} field='Description' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.newNotes} field='Notes' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableBooleanField value={this.state.newIsAsset} field='IsAsset' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.newValue} field='Value' readOnly={this.state.readOnly} visible={this.state.newIsAsset} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.newReference} field='Reference' readOnly={this.state.readOnly} visible={this.state.newIsAsset} onChangeHandler={this.onChangeHandler} /></td>
                    <td><StorageControl storage={this.props.item._links.storage.href}/></td>
                    <td><OrganisationControl organisation={this.props.item._links.organisation.href}/></td>
                </tr>
            )
        }
    }
}