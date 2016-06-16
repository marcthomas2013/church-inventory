import React from 'react';
import RoomControl from './RoomControl';

import EditableTextField from '../shared/EditableTextField';

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {value: this.props.room.name, readOnly: true};
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    handleFormSubmit(fieldValue, fieldName) {
        this.setState({value: fieldValue, readOnly: true});
    }

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span></td>
                    <td><EditableTextField value={this.state.value} field='room' readOnly={this.state.readOnly} /></td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onEditHandler}></span>
                        <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.handleFormSubmit}></span></td>
                    <td><EditableTextField value={this.state.value} field='room' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit}/></td>
                </tr>
            )
        }
    }
}