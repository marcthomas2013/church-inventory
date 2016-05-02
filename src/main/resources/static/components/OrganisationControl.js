const React = require('react');

export default class OrganisationControl extends React.Component {

    render() {
        var organisation = this.props.organisation;

        return (
            <div>
                <a href={organisation}>{organisation}</a>
            </div>
        )
    }
}