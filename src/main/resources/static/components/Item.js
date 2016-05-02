const React = require('react');

export default class Item extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.description}</td>
                <td>{this.props.item.notes}</td>
                <td>{this.props.item.value}</td>
                <td>{this.props.item.isAsset}</td>
                <td>{this.props.item.reference}</td>
                <td>{this.props.item.storage}</td>
                <td>{this.props.item.organisation}</td>
            </tr>
        )
    }
}