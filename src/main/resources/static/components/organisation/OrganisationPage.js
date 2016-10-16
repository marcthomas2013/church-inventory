import React from 'react';

import client from '../../client';
import follow from '../../follow'; // function to hop multiple links by "rel"

import OrganisationList from './OrganisationList';

import CreateOrganisationDialog from './CreateOrganisation';

const root = '/api';

export default class OrganisationPage extends React.Component {
    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = {organisations: [], attributes: [], pageSize: 100, links: {}};
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'organisations', params: {size: pageSize}}]
        ).then(organisationCollection => {
            return client({
                method: 'GET',
                path: organisationCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return organisationCollection;
            });
        }).done(organisationCollection => {
            this.setState({
                organisations: organisationCollection.entity._embedded.organisations,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: organisationCollection.entity._links});
        });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    componentWillMount() {
        this.loadFromServer(this.state.pageSize);
    }

    onCreate(newOrganisation) {
        follow(client, root, ['items']).then(organistationCollection => {
            return client({
                method: 'POST',
                path: organistationCollection.entity._links.self.href,
                entity: newOrganisation,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'organisations', params: {'size': this.state.pageSize}}]);
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
                    <h2>Organisations</h2>

                    <div>
                        <CreateOrganisationDialog attributes={this.state.attributes} self={this.state.links.self.href}
                                                  onUpdate={this.onUpdate} storage={this.state.storage}
                                                  organisations={this.state.organisations}/>

                        <br/>

                        <OrganisationList onUpdate={this.onUpdate} organisations={this.state.organisations}/>
                    </div>
                </div>)
        } else {
            return (<div></div>)
        }
    }
}