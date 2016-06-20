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
        this.onCreate = this.onCreate.bind(this);
        this.state = {items: [], attributes: [], pageSize: 100, links: {}};
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

    componentWillMount() {
        this.loadFromServer(this.state.pageSize);
    }

    onCreate(newItem) {

    }

    render() {
        if (this.state.links.self !== undefined) {
            return (
                <div>
                    <h2>Items</h2>

                    <div>
                        <CreateItemDialog attributes={this.state.attributes} self={this.state.links.self.href}
                                          onCreateUpdate={this.onCreate}/>
                        <br/>
                        <ItemList items={this.state.items}/>
                    </div>
                </div>);
        } else {
            return (<div></div>);
        }
    }
}