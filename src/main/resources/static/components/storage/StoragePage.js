import React from "react";
import client from "../../client";
import follow from "../../follow";
import StorageList from "./StorageList";
import CreateStorageDialog from "./CreateStorage"; // function to hop multiple links by "rel"

const root = '/api';

export default class StoragePage extends React.Component {
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {storage: [], attributes: [], pageSize: 100, links: {}};
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'storage', params: {size: pageSize}}]
        ).then(storageCollection => {
            return client({
                method: 'GET',
                path: storageCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return storageCollection;
            });
        }).done(storageCollection => {
            this.setState({
                storage: storageCollection.entity._embedded.storage,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: storageCollection.entity._links});
        });

        follow(client, root, [
            {rel: 'rooms', params: {size: pageSize}}]
        ).then(roomsCollection => {
            return client({
                method: 'GET',
                path: roomsCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
        return roomsCollection;
    });
    }).done(roomsCollection => {
            this.setState({
            rooms: roomsCollection.entity._embedded.rooms,
            attributes: Object.keys(this.schema.properties),
            pageSize: pageSize,
            links: roomsCollection.entity._links});
    });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    componentWillMount() {
        this.loadFromServer(this.state.pageSize);
    }

    onCreate(newRoom) {
        follow(client, root, ['storage']).then(storageCollection => {
            return client({
                method: 'POST',
                path: storageCollection.entity._links.self.href,
                entity: newStorage,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'storage', params: {'size': this.state.pageSize}}]);
        }).done(response => {
            this.onNavigate(response.entity._links.last.href);
        });
    }

    onUpdate() {
        this.loadFromServer(this.state.pageSize);
    }

    render() {
        if (this.state.links !== undefined && this.state.links.self !== undefined && this.state.rooms !== undefined) {
            return (
                <div>
                    <h2>Storage</h2>

                    <div>
                        <CreateStorageDialog attributes={this.state.attributes} self={this.state.links.self.href}
                                          onUpdate={this.onUpdate} storage={this.state.storage}
                                          rooms={this.state.rooms}/>

                        <br/>

                        <StorageList onUpdate={this.onUpdate} storage={this.state.storage} rooms={this.state.rooms}/>
                    </div>
                </div>)
        } else {
            return (<div></div>)
        }
    }
}