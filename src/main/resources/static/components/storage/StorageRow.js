import React from 'react';
import StorageControl from './StorageControl';
import RoomControl from './../room/RoomControl';
import BuildingControl from './../building/BuildingControl';

import EditableTextField from '../shared/EditableTextField';

export default class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
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
    }

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span></td>
                    <td><EditableTextField value={this.state.originalValue} field='storage' readOnly={this.state.readOnly} /></td>
                    <td><RoomControl room={this.props.storage._links.room.href}/></td>
                    <td>TODO</td>
                </tr>
            )
        } else {
            return (
                <tr className="success">
                    <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
                        <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
                    <td><EditableTextField value={this.state.newValue} field='storage' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
                    <td><RoomControl room={this.props.storage._links.room.href}/></td>
                    <td>TODO</td>
                </tr>
            )
        }
    }
}