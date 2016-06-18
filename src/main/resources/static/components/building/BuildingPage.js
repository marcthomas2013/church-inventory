import React from 'react';

import client from '../../client';
import follow from '../../follow'; // function to hop multiple links by "rel"

import BuildingList from './BuildingList';

const root = '/api';

export default class BuildingPage extends React.Component {
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.state = {buildings: [], attributes: [], pageSize: 10, links: {}};
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'buildings', params: {size: pageSize}}]
        ).then(buildingCollection => {
            return client({
                method: 'GET',
                path: buildingCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return buildingCollection;
            });
        }).done(buildingCollection => {
            this.setState({
                buildings: buildingCollection.entity._embedded.buildings,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: buildingCollection.entity._links});
        });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    onCreate(newBuilding) {
        follow(client, root, ['buildings']).then(buildingCollection => {
            return client({
                method: 'POST',
                path: buildingCollection.entity._links.self.href,
                entity: newBuilding,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'buildings', params: {'size': this.state.pageSize}}]);
        }).done(response => {
            this.onNavigate(response.entity._links.last.href);
        });
    }

    render() {
        return (
            <div>
                <h2>Buildings</h2>

                <div>
                    <BuildingList buildings={this.state.buildings}/>
                </div>
            </div>)
    }
}