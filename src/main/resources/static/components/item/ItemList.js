import React from 'react';
import ItemRow from './ItemRow';

export default class ItemList extends React.Component {
    render() {
        var items = this.props.items.map(item =>
            <ItemRow key={item._links.self.href} item={item} storage={this.props.storage} organisations={this.props.organisations}/>
        );
        return (
            <table className="table table-striped table-bordered">
                <tbody>
                <tr>
                    <th></th>
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Notes</th>
                    <th>Is Asset</th>
                    <th>Value</th>
                    <th>Reference</th>
                    <th>Storage</th>
                    <th>Organisation</th>
                </tr>
                {items}
                </tbody>
            </table>
        )
    }
}