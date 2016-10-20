import React from 'react';

import client from '../../client';
import follow from '../../follow'; // function to hop multiple links by "rel"

import BuildingList from './BuildingList';
import CreateBuildingDialog from './CreateBuilding';

const root = '/api';

export default class BuildingPage extends React.Component {
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {buildings: [], attributes: [], pageSize: 100, links: {}};
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

    componentWillMount() {
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

    onUpdate() {
        this.loadFromServer(this.state.pageSize);
    }

    render() {
        if (this.state.links !== undefined && this.state.links.self !== undefined) {
            return (
                <div>
                    <h2>Buildings</h2>

                    <div>
                        <CreateBuildingDialog attributes={this.state.attributes} self={this.state.links.self.href}
                                                  onUpdate={this.onUpdate} storage={this.state.storage}
                                                  buildings={this.state.organisations}/>

                        <br/>

                        <BuildingList onUpdate={this.onUpdate} buildings={this.state.buildings}/>
                    </div>
                </div>)
        } else {
            return (<div></div>)
        }
    }
}