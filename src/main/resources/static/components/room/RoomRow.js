import React from 'react';
import RoomControl from './RoomControl';

export default class Room extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.room.name}</td>
            </tr>
        )
    }
}