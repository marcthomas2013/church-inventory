import React from 'react';
import Room from './RoomRow';

export default class RoomList extends React.Component {
    render() {
        var rooms = this.props.rooms.map(room =>
            <Room onUpdate={this.props.onUpdate} key={room._links.self.href} room={room} buildings={this.props.buildings}/>
        );
        return (
            <table className="table table-striped table-bordered">
                <tbody>
                <tr>
                    <th></th>
                    <th>Room Name</th>
                    <th>Building Name</th>
                </tr>
                {rooms}
                </tbody>
            </table>
        )
    }
}