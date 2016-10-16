import React from 'react';

import RemoveItemDialog from '../shared/RemoveItemDialog';

import EditableTextField from '../shared/EditableTextField';

import client from '../../client';
import createAlert from '../../alerts';

export default class Organisation extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.state = {originalValue: this.props.organisation.name, newValue: this.props.organisation.name, readOnly: true};
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
        this.onUpdate(this.props.organisation._links.self, {"name": this.state.newValue});
    }

    onUpdate(self, organisation) {
        client({
            method: 'PUT',
            path: self.href,
            entity: organisation,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Changes have been saved successfuly', 'alert-success');

            console.log('Success: ' + response);
        }, function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not save the changes, please try again', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }

    onDeleteHandler(value) {
        console.log("Deleting organisation: " + value);

        client({
            method: 'DELETE',
            path: value,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            createAlert('<strong>Success</strong> - Organisation has been removed', 'alert-success');

            console.log('Success: ' + response);
            this.props.onUpdate();
        }.bind(this), function(response) {
            createAlert('<strong>Oh snap!</strong> - Could not remove the organisation. This will probably be because it is being used. Please move things from the organisation before removing it.', 'alert-danger');

            console.log('Failed: ' + response);
        });
    }

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span><RemoveItemDialog value={this.props.organisation._links.self.href} onDeleteHandler={this.onDeleteHandler}/></td>
                    <td><EditableTextField value={this.state.originalValue} field='organisation' readOnly={this.state.readOnly} /></td>
                </tr>
            )
        } else {
            return (
                <tr className="success">
                    <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
                        <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
                    <td><EditableTextField value={this.state.newValue} field='organisation' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
                </tr>
            )
        }
    }
}