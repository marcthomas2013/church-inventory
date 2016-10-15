import React from 'react';
import Storage from './StorageRow';

export default class StorageList extends React.Component {
    render() {
        var storage = this.props.storage.map(storage =>
            <Storage onUpdate={this.props.onUpdate} key={storage._links.self.href} storage={storage}/>
        );
        return (
            <table className="table table-striped table-bordered">
                <tbody>
                <tr>
                    <th></th>
                    <th>Storage Names</th>
                    <th>Room Names</th>
                    <th>Building Names</th>
                </tr>
                {storage}
                </tbody>
            </table>
        )
    }
}