import React from 'react';
import BuildingControl from './../building/BuildingControl';

import EditableTextField from '../shared/EditableTextField';

import RemoveItemDialog from '../shared/RemoveItemDialog';

import client from '../../client';
import createAlert from '../../alerts';

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onBuildingChangeHandler = this.onBuildingChangeHandler.bind(this);
        var values = this.props.room._links.self.href.split("/");

        this.state = {id: values[values.length - 1],
            originalValue: this.props.room.name, newValue: this.props.room.name,
            originalBuilding: this.props.room._links.building.href, newBuilding: this.props.room._links.building.href,
            originalBuildingId: "1", newBuildingId: "1",
            readOnly: true};
    }

    onCancelHandler() {
        this.setState({readOnly: !this.state.readOnly, newValue: this.state.originalValue,
        newBuilding: this.state.originalBuilding, newBuildingId: this.state.originalBuildingId});
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    onChangeHandler(fieldValue, fieldName) {
        this.setState({newValue: fieldValue});
    }

    onSuccessHandler() {
        this.setState({originalValue: this.state.newValue, newValue: this.state.newValue,
            originalBuilding: this.state.newBuilding, newOrganisation: this.state.newBuilding,
            originalBuildingId: this.state.newBuildingId, newBuildingId: this.state.newBuildingId,
            readOnly: true});
        this.onUpdate(this.props.room._links.self,
            {
                "id": this.state.id,
                "name": this.state.newValue,
                "buildingId": this.state.newBuildingId
            });
    }

    onBuildingChangeHandler(fieldValue, fieldName) {
        var stateObject = {};
        fieldName = "new" + fieldName;
        stateObject[fieldName] = fieldValue;
        this.setState(stateObject);

        var values = fieldValue.split("/");
        this.setState({"newBuildingId": values[values.length - 1]});
    }

    onUpdate(self, newRoom) {
        client({
            method: 'PUT',
            path: 'http://localhost:5000/api/updateRoom',
            entity: newRoom,
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
        console.log("Deleting room: " + value);

        client({
            method: 'DELETE',
            path: value,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Room has been removed', 'alert-success');

            console.log('Success: ' + response);
            this.props.onUpdate();
        }.bind(this), function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not remove the room. This will probably be because it is being used. Please move things from the room before removing it.', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="button-link glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span><RemoveItemDialog value={this.props.room._links.self.href} onDeleteHandler={this.onDeleteHandler}/></td>
                    <td><EditableTextField value={this.state.originalValue} field='room' readOnly={this.state.readOnly} /></td>
                    <td><BuildingControl self={this.state.originalBuilding} field='Building' buildings={this.props.buildings} readOnly={this.state.readOnly} onChangeHandler={this.onBuildingChangeHandler}/></td>
                </tr>
            )
        } else {
            return (
                <tr className="success">
                    <td><span className="button-link glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
                        <span className="button-link glyphicon glyphicon-ok" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
                    <td><EditableTextField value={this.state.newValue} field='room' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
                    <td><BuildingControl self={this.state.newBuilding} field='Building' buildings={this.props.buildings} readOnly={this.state.readOnly} onChangeHandler={this.onBuildingChangeHandler}/></td>
                </tr>
            )
        }
    }
}