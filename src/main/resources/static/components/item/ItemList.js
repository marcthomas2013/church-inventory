import React from 'react';
import Item from './ItemRow';

export default class ItemList extends React.Component {
    render() {
        var items = this.props.items.map(item =>
            <Item key={item._links.self.href} item={item}/>
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