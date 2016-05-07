import React from 'react';
import StorageControl from './StorageControl';

export default class Storage extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.storage.name}</td>
            </tr>
        )
    }
}