import React from 'react';
import RoomControl from './../room/RoomControl';
import RemoveItemDialog from '../shared/RemoveItemDialog';

import EditableTextField from '../shared/EditableTextField';

import client from '../../client';
import createAlert from '../../alerts';

export default class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onRoomChangeHandler = this.onRoomChangeHandler.bind(this);
        var values = this.props.storage._links.self.href.split("/");

        this.state = {id: values[values.length - 1],
            originalName: this.props.storage.name, newName: this.props.storage.name,
            originalMainContents: this.props.storage.mainContents, newMainContents: this.props.storage.mainContents,
            originalNotes: this.props.storage.notes, newNotes: this.props.storage.notes,
            originalRoom: this.props.storage._links.room.href, newRoom: this.props.storage._links.room.href,
            originalRoomId: "1", newRoomId: "1",
            readOnly: true};
    }

    onCancelHandler() {
        this.setState({readOnly: !this.state.readOnly, newName: this.state.originalName,
            newMainContents: this.state.originalMainContents,
            newRoomId: this.state.originalRoomId, newRoom: this.state.originalRoom,
            newNotes: this.state.originalNotes});
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

    onRoomChangeHandler(fieldValue, fieldName) {
        var stateObject = {};
        fieldName = "new" + fieldName;
        stateObject[fieldName] = fieldValue;
        this.setState(stateObject);

        var values = fieldValue.split("/");
        this.setState({"newRoomId": values[values.length - 1]});
    }

    onSuccessHandler(e) {
        this.setState({originalName: this.state.newName, newName: this.state.newName,
            originalMainContents: this.state.newMainContents, newMainContents: this.state.newMainContents,
            originalRoom: this.state.newRoom, newRoom: this.state.newRoom,
            originalRoomId: this.state.newRoomId, newRoomId: this.state.newRoomId,
            originalNotes: this.state.newNotes, newNotes: this.state.newNotes, readOnly: true});
        this.onUpdate(this.props.storage._links.self, {
            "id": this.state.id,
            "name": this.state.newName,
            "mainContents": this.state.newMainContents,
            "roomId": this.state.newRoomId,
            "notes": this.state.newNotes});
    }

    onUpdate(self, storage) {
        client({
            method: 'PUT',
            path: 'http://localhost:5000/api/updateStorage',
            entity: storage,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Changes have been saved successfully', 'alert-success');

            console.log('Success: ' + response);
        }, function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not save the changes, please try again', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }

    onDeleteHandler(value) {
        console.log("Deleting storage: " + value);

        client({
            method: 'DELETE',
            path: value,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Storage has been removed', 'alert-success');

            console.log('Success: ' + response);
            this.props.onUpdate();
        }.bind(this), function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not remove the storage. This will probably be because it is being used. Please move things from the storage before removing it.', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="button-link glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span><RemoveItemDialog value={this.props.storage._links.self.href} onDeleteHandler={this.onDeleteHandler}/></td>
                    <td><EditableTextField value={this.state.originalName} field='Name' readOnly={this.state.readOnly} /></td>
                    <td><EditableTextField value={this.state.originalMainContents} field='MainContents' readOnly={this.state.readOnly} /></td>
                    <td><EditableTextField value={this.state.originalNotes} field='Notes' readOnly={this.state.readOnly} /></td>
                    <td><RoomControl self={this.state.originalRoom} readOnly={this.state.readOnly} field='Room' rooms={this.props.rooms} onChangeHandler={this.onRoomChangeHandler}/></td>
                    <td>{this.props.storage.building.name}</td>
                </tr>
            )
        } else {
            return (
                <tr className="success">
                    <td><span className="button-link glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
                        <span className="button-link glyphicon glyphicon-ok" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
                    <td><EditableTextField value={this.state.newName} field='Name' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
                    <td><EditableTextField value={this.state.newMainContents} field='MainContents' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
                    <td><EditableTextField value={this.state.newNotes} field='Notes' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
                    <td><RoomControl self={this.state.newRoom} readOnly={this.state.readOnly} field='Room' rooms={this.props.rooms} onChangeHandler={this.onRoomChangeHandler}/></td>
                    <td>{this.props.storage.building.name}</td>
                </tr>
            )
        }
    }
}