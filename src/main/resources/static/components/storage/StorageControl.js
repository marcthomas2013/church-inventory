import React from 'react';
import client from '../../client';

export default class StorageControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {storageName: "", readOnly: this.props.readOnly, storageLink: this.props.self, storage: this.props.storage, field: this.props.field};

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.props.onChangeHandler(e.target.value, this.state.field);
    }
    
    componentDidMount() {
        this.loadFromServer(this.state.readOnly, this.state.storageLink);
    }

    loadFromServer(readOnly, self) {
        this.result = client({
            method: 'GET',
            path: self
        }).then(result => {
            this.setState({storageName: result.entity.name, readOnly: readOnly, storageLink: self});
            return result;
        });
    }

    // Ensure the state of the component is updated before rendering
    componentWillReceiveProps(nextProps) {
        this.loadFromServer(nextProps.readOnly, nextProps.self);
    }

    render() {
        if(this.state.readOnly) {
            return (
                <div>
                    <a href="#storage">{this.state.storageName}</a>
                </div>
            )
        } else {
            var options = this.state.storage.map(storage => {
                return (<option key={storage._links.self.href} value={storage._links.self.href}>{storage.name}</option>);
            });

            return (
                <div>
                    <select value={this.state.storageLink}
                            className="form-control"
                            onChange={this.onChangeHandler}>
                        {options}
                    </select>
                </div>
            )
        }
    }
}