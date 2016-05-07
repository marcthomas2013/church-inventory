import React from 'react';
import OrganisationControl from './OrganisationControl';

export default class Organisation extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.organisation.name}</td>
            </tr>
        )
    }
}