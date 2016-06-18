import React from 'react';
import client from '../../client';

export default class StorageControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {storageName: ""};
    }

    componentDidMount() {
        this.storageLink = this.props.storage;
        this.loadFromServer();
    }

    loadFromServer() {
        this.result = client({
            method: 'GET',
            path: this.storageLink
        }).then(result => {
            this.setState({storageName: result.entity.name});
            return result;
        });
    }

    render() {
        return (
            <div>
                <a href="#storage">{this.state.storageName}</a>
            </div>
        )
    }
}