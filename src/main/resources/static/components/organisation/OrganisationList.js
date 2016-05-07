import React from 'react';
import Organisation from './OrganisationRow';

export default class OrganisationList extends React.Component {
    render() {
        var organisations = this.props.organisations.map(organisation =>
            <Organisation key={organisation._links.self.href} organisation={organisation}/>
        );
        return (
            <table>
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