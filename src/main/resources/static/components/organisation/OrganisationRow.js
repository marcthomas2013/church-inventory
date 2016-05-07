const React = require('react');
const OrganisationControl = require('./OrganisationControl');
const StorageControl = require('./StorageControl');

export default class Organisation extends React.Component {
    render() {
        return (
            <tr>
                <td><OrganisationControl organisation={this.props.item._links.organisation.href}/></td>
            </tr>
        )
    }
}