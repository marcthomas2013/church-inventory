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
                    <th>Storage Name</th>
                    <th>Main Contents</th>
                    <th>Notes</th>
                    <th>Room Name</th>
                    <th>Building Name</th>
                </tr>
                {storage}
                </tbody>
            </table>
        )
    }
}