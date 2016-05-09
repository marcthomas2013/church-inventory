import React from 'react';
import client from '../../client';

export default class OrganisationControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {organisationName: ""};
    }

    componentDidMount() {
        this.organisationLink = this.props.organisation;
        this.loadFromServer();
    }

    loadFromServer() {
        this.result = client({
            method: 'GET',
            path: this.organisationLink
        }).then(result => {
            this.setState({organisationName: result.entity.name});
            return result;
        });
    }

    render() {
        return (
            <div>
                <a href="#organisation">Create</a> <a href={this.organisationLink}>{this.state.organisationName}</a>
            </div>
        )
    }
}