import React from 'react';
import Room from './RoomRow';

export default class RoomList extends React.Component {
    render() {
        var rooms = this.props.rooms.map(room =>
            <Room key={room._links.self.href} room={room}/>
        );
        return (
            <table className="table table-striped table-bordered">
                <tbody>
                <tr>
                    <th></th>
                    <th>Room Names</th>
                </tr>
                {rooms}
                </tbody>
            </table>
        )
    }
}