import React from 'react';
import RoomControl from './RoomControl';
import BuildingControl from './../building/BuildingControl';

import EditableTextField from '../shared/EditableTextField';

import client from '../../client';
import createAlert from '../../alerts';

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.state = {originalValue: this.props.room.name, newValue: this.props.room.name, readOnly: true};
    }

    onCancelHandler() {
        this.setState({readOnly: !this.state.readOnly, newValue: this.state.originalValue});
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    onChangeHandler(fieldValue, fieldName) {
        this.setState({newValue: fieldValue});
    }

    onSuccessHandler() {
        this.setState({originalValue: this.state.newValue, newValue: this.state.newValue, readOnly: true});
        this.onUpdate(this.props.room._links.self, {"name": this.state.newValue});
    }

    onUpdate(self, newRoom) {
        client({
            method: 'PUT',
            path: self.href,
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

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span></td>
                    <td><EditableTextField value={this.state.originalValue} field='room' readOnly={this.state.readOnly} /></td>
                    <td><BuildingControl building={this.props.room._links.building.href}/></td>
                </tr>
            )
        } else {
            return (
                <tr className="success">
                    <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
                        <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
                    <td><EditableTextField value={this.state.newValue} field='room' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
                    <td><BuildingControl building={this.props.room._links.building.href}/></td>
                </tr>
            )
        }
    }
}