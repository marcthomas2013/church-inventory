const React = require('react');
const Organisation = require('./OrganisationRow');

export default class OrganisationList extends React.Component {
    render() {
        var organisations = this.props.organisations.map(organisation =>
            <Organisation key={organisation._links.self.href} item={organisation}/>
        );
        return (
            <table>
                <tr>
                    <th>Organisation Name</th>
                </tr>
                {organisations}
            </table>
        )
    }
}