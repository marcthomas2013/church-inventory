import React from 'react';
import Item from './Item';

export default class ItemList extends React.Component {
    render() {
        var items = this.props.items.map(item =>
            <Item key={item._links.self.href} item={item}/>
        );
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Notes</th>
                        <th>Value</th>
                        <th>Is Asset</th>
                        <th>Reference</th>
                        <th>Storage</th>
                        <th>Organisation</th>
                    </tr>
                </tbody>
                {items}
            </table>
        )
    }
}