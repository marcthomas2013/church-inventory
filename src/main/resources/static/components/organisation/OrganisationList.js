import React from 'react';
import Organisation from './OrganisationRow';

export default class OrganisationList extends React.Component {
    render() {
        var organisations = this.props.organisations.map(organisation =>
            <Organisation onUpdate={this.props.onUpdate} key={organisation._links.self.href} organisation={organisation}/>
        );
        return (
            <table className="table table-striped table-bordered">
                <tbody>
                <tr>
                    <th></th>
                    <th>Organisation Names</th>
                </tr>
                {organisations}
                </tbody>
            </table>
        )
    }
}