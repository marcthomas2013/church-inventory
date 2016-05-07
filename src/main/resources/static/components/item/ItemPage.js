import React from 'react';

import client from '../../client';
import follow from '../../follow'; // function to hop multiple links by "rel"

import CreateItemDialog from './CreateItemDialog';
import ItemList from './ItemList';

const root = '/api';

export default class ItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.state = {items: [], attributes: [], pageSize: 5, links: {}};
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
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    onCreate(newItem) {
        follow(client, root, ['items']).then(itemCollection => {
            return client({
                method: 'POST',
                path: itemCollection.entity._links.self.href,
                entity: newItem,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'items', params: {'size': this.state.pageSize}}]);
        }).done(response => {
            this.onNavigate(response.entity._links.last.href);
        });
    }

    render() {
        return (
            <div>
                <h2>Items</h2>

                <div>
                    <CreateItemDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                    <ItemList items={this.state.items}/>
                </div>
            </div>)
    }
}