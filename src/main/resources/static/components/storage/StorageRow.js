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
        this.state = {originalValue: this.props.storage.name, newValue: this.props.storage.name, readOnly: true};
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

    onSuccessHandler(e) {
        this.setState({originalValue: this.state.newValue, newValue: this.state.newValue, readOnly: true});
        this.onUpdate(this.props.storage._links.self, {"name": this.state.newValue});
    }

    onUpdate(self, storage) {
        client({
            method: 'PUT',
            path: self.href,
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
            /*
             <tr>
             <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span></td>
             <td><EditableTextField value={this.state.originalValue} field='storage' readOnly={this.state.readOnly} /></td>
             <td><RoomControl room={this.props.storage._links.room.href}/></td>
             <td><BuildingControl building={this.props.storage._links.building.href}/></td>
             </tr>

             <tr className="success">
             <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
             <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
             <td><EditableTextField value={this.state.newValue} field='storage' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
             <td><RoomControl room={this.props.storage._links.room.href}/></td>
             <td><BuildingControl building={this.props.storage._links.building.href}/></td>
             </tr>
             */
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span><RemoveItemDialog value={this.props.storage._links.self.href} onDeleteHandler={this.onDeleteHandler}/></td>
                    <td><EditableTextField value={this.state.originalValue} field='storage' readOnly={this.state.readOnly} /></td>
                    <td><RoomControl room={this.props.storage._links.room.href}/></td>
                    <td>{this.props.storage.building.name}</td>
                </tr>
            )
        } else {
            return (
                <tr className="success">
                    <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
                        <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
                    <td><EditableTextField value={this.state.newValue} field='storage' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
                    <td><RoomControl room={this.props.storage._links.room.href}/></td>
                    <td>{this.props.storage.building.name}</td>
                </tr>
            )
        }
    }
}