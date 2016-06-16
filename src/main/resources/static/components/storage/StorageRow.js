import React from 'react';
import StorageControl from './StorageControl';

import EditableTextField from '../shared/EditableTextField';

export default class Storage extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {value: this.props.storage.name, readOnly: true};
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    handleFormSubmit(fieldValue, fieldName) {
        this.setState({value: fieldValue, readOnly: true});
    }

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span></td>
                    <td><EditableTextField value={this.state.value} field='storage' readOnly={this.state.readOnly} /></td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onEditHandler}></span>
                        <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.handleFormSubmit}></span></td>
                    <td><EditableTextField value={this.state.value} field='storage' readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit}/></td>
                </tr>
            )
        }
    }
}