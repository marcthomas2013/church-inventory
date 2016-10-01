import React from 'react';
import OrganisationControl from '../organisation/OrganisationControl';
import StorageControl from '../storage/StorageControl';

import EditableTextField from '../shared/EditableTextField';
import EditableTextArea from '../shared/EditableTextArea';
import EditableBooleanField from '../shared/EditableBooleanField';

import RemoveItemDialog from './RemoveItemDialog';

import client from '../../client';
import createAlert from '../../alerts';

export default class ItemRow extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onOrganisationChangeHandler = this.onOrganisationChangeHandler.bind(this);
        this.onStorageChangeHandler = this.onStorageChangeHandler.bind(this);

        var values = this.props.item._links.self.href.split("/");

        this.state = {id: values[values.length - 1],
            originalName: this.props.item.name, newName: this.props.item.name,
            originalDescription: this.props.item.description, newDescription: this.props.item.description,
            originalNotes: this.props.item.notes, newNotes: this.props.item.notes,
            originalIsAsset: this.props.item.isAsset, newIsAsset: this.props.item.isAsset,
            originalValue: "" + this.props.item.value, newValue: "" + this.props.item.value,
            originalReference: this.props.item.reference, newReference: this.props.item.reference,
            originalStorage: this.props.item._links.storage.href, newStorage: this.props.item._links.storage.href,
            originalOrganisation: this.props.item._links.organisation.href, newOrganisation: this.props.item._links.organisation.href,
            originalStorageId: "1", newStorageId: "1",
            originalOrganisationId: "1", newOrganisationId: "1",
            readOnly: true};
    }

    onCancelHandler() {
        this.setState({originalName: this.state.originalName, newName: this.state.originalName,
            originalDescription: this.state.originalDescription, newDescription: this.state.originalDescription,
            originalNotes: this.state.originalNotes, newNotes: this.state.originalNotes,
            originalIsAsset: this.state.originalIsAsset, newIsAsset: this.state.originalIsAsset,
            originalValue: "" + this.state.originalValue, newValue: "" + this.state.originalValue,
            originalReference: this.state.originalReference, newReference: this.state.originalReference,
            originalStorage: this.state.originalStorage, newStorage: this.state.originalStorage,
            originalOrganisation: this.state.originalOrganisation, newOrganisation: this.state.originalOrganisation,
            originalStorageId: this.state.originalStorageId, newStorageId: this.state.originalStorageId,
            originalOrganisationId: this.state.originalOrganisationId, newOrganisationId: this.state.originalOrganisationId,
            readOnly: true});
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    onDeleteHandler(value) {
        console.log("Deleting item: " + value);

        client({
            method: 'DELETE',
            path: value,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Item has been removed', 'alert-success');

            console.log('Success: ' + response);
            this.props.onUpdate();
        }.bind(this), function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not remove item, please try again', 'alert-danger');

            console.log('Failed: ' + response);
        });
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
            originalStorage: this.state.newStorage, newStorage: this.state.newStorage,
            originalOrganisation: this.state.newOrganisation, newOrganisation: this.state.newOrganisation,
            originalStorageId: this.state.newStorageId, newStorageId: this.state.newStorageId,
            originalOrganisationId: this.state.newOrganisationId, newOrganisationId: this.state.newOrganisationId,
            readOnly: true});
        this.onUpdate(this.props.item._links.self,
            {
                "id": this.state.id,
                "name": this.state.newName,
                "description": this.state.newDescription,
                "notes": this.state.newNotes,
                "value": this.state.newValue,
                "isAsset": this.state.newIsAsset,
                "reference": this.state.newReference,
                "storageId": this.state.newStorageId,
                "organisationId": this.state.newOrganisationId
            });
    }

    onCreate() {
        var item = {
            "name": this.state.name,
            "description": this.state.description,
            "notes": this.state.notes,
            "value": this.state.value,
            "isAsset": (this.state.isAsset === "on"),
            "reference": this.state.reference,
            "storageId": this.state.storageId,
            "organisationId": this.state.organisationId
        };

        client({
            method: 'POST',
            path: 'http://localhost:5000/api/createItem',
            entity: item,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Changes have been saved successfuly', 'alert-success');

            console.log('Success: ' + response);

            $('#createItem').modal('hide');
            this.props.onUpdate();
        }.bind(this), function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not save the changes, please try again', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }
    
    onUpdate(self, item) {
        client({
            method: 'PUT',
            path: 'http://localhost:5000/api/updateItem',
            entity: item,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Changes have been saved successfuly', 'alert-success');

            console.log('Success: ' + response);
        }, function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not save the changes, please try again', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }

    onOrganisationChangeHandler(fieldValue, fieldName) {
        var stateObject = {};
        fieldName = "new" + fieldName;
        stateObject[fieldName] = fieldValue;
        this.setState(stateObject);

        var values = fieldValue.split("/");
        this.setState({"newOrganisationId": values[values.length - 1]});
    }

    onStorageChangeHandler(fieldValue, fieldName) {
        var stateObject = {};
        fieldName = "new" + fieldName;
        stateObject[fieldName] = fieldValue;
        this.setState(stateObject);

        var values = fieldValue.split("/");
        this.setState({"newStorageId": values[values.length - 1]});
    }

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span><RemoveItemDialog value={this.props.item._links.self.href} onDeleteHandler={this.onDeleteHandler}/></td>
                    <td><EditableTextField value={this.state.originalName} field='Name' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextArea value={this.state.originalDescription} field='Description' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextArea value={this.state.originalNotes} field='Notes' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableBooleanField value={this.state.originalIsAsset} field='IsAsset' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.originalValue} field='Value' readOnly={this.state.readOnly} visible={this.state.originalIsAsset} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.originalReference} field='Reference' readOnly={this.state.readOnly} visible={this.state.originalIsAsset} onChangeHandler={this.onChangeHandler} /></td>
                    <td><StorageControl self={this.state.originalStorage} field='Storage' storage={this.props.storage} readOnly={this.state.readOnly} onChangeHandler={this.onStorageChangeHandler}/></td>
                    <td><OrganisationControl self={this.state.originalOrganisation} field='Organisation' organisations={this.props.organisations} readOnly={this.state.readOnly} onChangeHandler={this.onOrganisationChangeHandler}/></td>
                </tr>
            )
        } else {
            return (
                <tr className="success">
                    <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
                        <span className="glyphicon glyphicon-ok buttonPadding" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
                    <td><EditableTextField value={this.state.newName} field='Name' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextArea value={this.state.newDescription} field='Description' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextArea value={this.state.newNotes} field='Notes' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableBooleanField value={this.state.newIsAsset} field='IsAsset' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.newValue} field='Value' readOnly={this.state.readOnly} visible={this.state.newIsAsset} onChangeHandler={this.onChangeHandler} /></td>
                    <td><EditableTextField value={this.state.newReference} field='Reference' readOnly={this.state.readOnly} visible={this.state.newIsAsset} onChangeHandler={this.onChangeHandler} /></td>
                    <td><StorageControl self={this.state.newStorage} field='Storage' storage={this.props.storage} readOnly={this.state.readOnly} onChangeHandler={this.onStorageChangeHandler}/></td>
                    <td><OrganisationControl self={this.state.newOrganisation} field='Organisation' organisations={this.props.organisations} readOnly={this.state.readOnly} onChangeHandler={this.onOrganisationChangeHandler}/></td>
                </tr>
            )
        }
    }
}