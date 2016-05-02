const React = require('react');
const OrganisationControl = require('./OrganisationControl');
const StorageControl = require('./StorageControl');

export default class Item extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.description}</td>
                <td>{this.props.item.notes}</td>
                <td>{"" + this.props.item.value}</td>
                <td>{"" + this.props.item.isAsset}</td>
                <td>{this.props.item.reference}</td>
                <td><StorageControl storage={this.props.item._links.storage.href}/></td>
                <td><OrganisationControl organisation={this.props.item._links.organisation.href}/></td>
            </tr>
        )
    }
}