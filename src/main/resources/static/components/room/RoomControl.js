import React from 'react';
import client from '../../client';

export default class RoomControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {roomName: ""};
    }

    componentDidMount() {
        this.roomLink = this.props.room;
        this.loadFromServer();
    }

    loadFromServer() {
        this.result = client({
            method: 'GET',
            path: this.roomLink
        }).then(result => {
            this.setState({roomName: result.entity.name});
            return result;
        });
    }

    render() {
        return (
            <div>
                <a href="#room">{this.state.roomName}</a>
            </div>
        )
    }
}