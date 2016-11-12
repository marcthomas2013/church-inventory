import React from 'react';
import client from '../../client';

export default class RoomControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {roomName: "", readOnly: this.props.readOnly, roomLink: this.props.self, room: this.props.room, rooms: this.props.rooms, field: this.props.field};

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.props.onChangeHandler(e.target.value, this.state.field);
    }

    componentDidMount() {
        this.loadFromServer(this.state.readOnly, this.state.roomLink);
    }

    loadFromServer(readOnly, self) {
        this.result = client({
            method: 'GET',
            path: self
        }).then(result => {
            this.setState({roomName: result.entity.name, readOnly: readOnly, roomLink: self});
            return result;
        });
    }

    // Ensure the state of the component is updated before rendering
    componentWillReceiveProps(nextProps) {
        this.loadFromServer(nextProps.readOnly, nextProps.self);
    }

    render() {
        if(this.state.readOnly) {
            return (
                <div>
                    <a href="#room">{this.state.roomName}</a>
                </div>
            )
        } else {
            var options = this.state.rooms.map(room => {
                return (<option key={room._links.self.href} value={room._links.self.href}>{room.name}</option>);
            });

            return (
                <div>
                    <select value={this.state.roomLink}
                            className="form-control"
                            onChange={this.onChangeHandler}>
                        {options}
                    </select>
                </div>
            )
        }
    }
}