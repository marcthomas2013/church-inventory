import React from 'react';
import RoomControl from './RoomControl';

import EditableTextField from '../shared/EditableTextField';

export default class Room extends React.Component {
    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {value: this.props.room.name, readOnly: true};
    }

    handleFormSubmit(fieldValue, fieldName) {
        this.setState({value: fieldValue, readOnly: true});
    }

    render() {
        return (
            <tr>
                <td><EditableTextField value={this.state.value} field='room' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit} /></td>
            </tr>
        )
    }
}