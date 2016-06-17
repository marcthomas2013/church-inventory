import React from 'react';
import OrganisationControl from './OrganisationControl';

import EditableTextField from '../shared/EditableTextField';

export default class Organisation extends React.Component {
    constructor(props) {
        super(props);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSuccessHandler = this.onSuccessHandler.bind(this);
        this.state = {originalValue: this.props.organisation.name, newValue: this.props.organisation.name, readOnly: true};
    }

    onCancelHandler() {
        this.setState({readOnly: !this.state.readOnly, newValue: this.state.originalValue});
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    onChangeHandler(fieldValue, fieldName) {
        this.setState({newValue: fieldValue});
    }

    onSuccessHandler(e) {
        this.setState({originalValue: this.state.newValue, newValue: this.state.newValue, readOnly: true});
    }

    render() {
        if (this.state.readOnly) {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-pencil" aria-hidden="true" onClick={this.onEditHandler}></span></td>
                    <td><EditableTextField value={this.state.originalValue} field='organisation' readOnly={this.state.readOnly} /></td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.onCancelHandler}></span>
                        <span className="glyphicon glyphicon-ok" aria-hidden="true" onClick={this.onSuccessHandler}></span></td>
                    <td><EditableTextField value={this.state.newValue} field='organisation' readOnly={this.state.readOnly} onChangeHandler={this.onChangeHandler}/></td>
                </tr>
            )
        }
    }
}