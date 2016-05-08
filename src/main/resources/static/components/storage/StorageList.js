import React from 'react';
import Storage from './StorageRow';

export default class StorageList extends React.Component {
    render() {
        var storage = this.props.storage.map(storage =>
            <Storage key={storage._links.self.href} storage={storage}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>Storage Names</th>
                </tr>
                {storage}
                </tbody>
            </table>
        )
    }
}