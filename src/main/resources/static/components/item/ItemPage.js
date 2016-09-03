import React from 'react';

import client from '../../client';
import follow from '../../follow'; // function to hop multiple links by "rel"

import CreateItemDialog from './CreateItemDialog';
import ItemList from './ItemList';

import createAlert from '../../alerts';

const root = '/api';

export default class ItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {items: undefined, storage: undefined, organisations: undefined, attributes: [], pageSize: 100, links: {}};
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'items', params: {size: pageSize}}]
        ).then(itemCollection => {
            return client({
                method: 'GET',
                path: itemCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return itemCollection;
            });
        }).done(itemCollection => {
            this.setState({
                items: itemCollection.entity._embedded.items,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: itemCollection.entity._links});
        });

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
            {rel: 'organisations', params: {size: pageSize}}]
        ).then(organisationsCollection => {
            return client({
                method: 'GET',
                path: organisationsCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return organisationsCollection;
            });
        }).done(organisationsCollection => {
            this.setState({
                organisations: organisationsCollection.entity._embedded.organisations,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: organisationsCollection.entity._links});
        });
    }

    componentWillMount() {
        this.loadFromServer(this.state.pageSize);
    }

    onUpdate() {
        this.componentWillMount();
    }

    render() {
        if (this.state.items !== undefined && this.state.storage !== undefined && this.state.organisations !== undefined) {
            return (
                <div>
                    <h2>Items</h2>

                    <div>
                        <CreateItemDialog attributes={this.state.attributes} self={this.state.links.self.href}
                                          onUpdate={this.onUpdate} storage={this.state.storage}
                                          organisations={this.state.organisations}/>
                        <br/>
                        <ItemList onUpdate={this.onUpdate} items={this.state.items} storage={this.state.storage} organisations={this.state.organisations}/>
                    </div>
                </div>);
        } else {
            return (<div></div>);
        }
    }
}