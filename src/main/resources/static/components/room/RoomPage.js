import React from "react";
import client from "../../client";
import follow from "../../follow";
import RoomList from "./RoomList";
import CreateRoomDialog from "./CreateRoom"; // function to hop multiple links by "rel"

const root = '/api';

export default class RoomPage extends React.Component {
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {rooms: [], attributes: [], pageSize: 100, links: {}};
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'rooms', params: {size: pageSize}}]
        ).then(roomCollection => {
            return client({
                method: 'GET',
                path: roomCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return roomCollection;
            });
        }).done(roomCollection => {
            this.setState({
                rooms: roomCollection.entity._embedded.rooms,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: roomCollection.entity._links});
        });

        follow(client, root, [
            {rel: 'buildings', params: {size: pageSize}}]
        ).then(buildingsCollection => {
            return client({
                method: 'GET',
                path: buildingsCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return buildingsCollection;
            });
        }).done(buildingsCollection => {
            this.setState({
                buildings: buildingsCollection.entity._embedded.buildings,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: buildingsCollection.entity._links});
        });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    componentWillMount() {
        this.loadFromServer(this.state.pageSize);
    }

    onCreate(newRoom) {
        follow(client, root, ['rooms']).then(roomsCollection => {
            return client({
                method: 'POST',
                path: roomsCollection.entity._links.self.href,
                entity: newRoom,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'rooms', params: {'size': this.state.pageSize}}]);
        }).done(response => {
            this.onNavigate(response.entity._links.last.href);
        });
    }

    onUpdate() {
        this.loadFromServer(this.state.pageSize);
    }

    render() {
        if (this.state.links !== undefined && this.state.links.self !== undefined) {
            return (
                <div>
                    <h2>Rooms</h2>

                    <div>
                        <CreateRoomDialog attributes={this.state.attributes} self={this.state.links.self.href}
                                              onUpdate={this.onUpdate}/>

                        <br/>

                        <RoomList onUpdate={this.onUpdate} rooms={this.state.rooms} buildings={this.state.buildings}/>
                    </div>
                </div>)
        } else {
            return (<div></div>)
        }
    }
}