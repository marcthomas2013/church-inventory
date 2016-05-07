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
        return (
            <tr>
                <td><input type="button" value={this.state.readOnly ? 'Edit' : 'Cancel'} onClick={this.onEditHandler} /></td>
                <td><EditableTextField value={this.state.value} field='room' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
            </tr>
        )
    }
}