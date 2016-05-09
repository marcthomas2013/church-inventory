import React from 'react';

export default class EditableBooleanField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {originalValue: this.props.value, value: this.props.value, field: this.props.field, readOnly: this.props.readOnly};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var value = this.state.value;
        this.props.handleFormSubmit(value, this.state.field);
    }

    handleSelectChange(e) {
        this.setState({value: e.target.value});
    }

    onEditHandler(e) {
        this.setState({readOnly: !this.state.readOnly, value: this.state.originalValue});
    }

    // Ensure the state of the component is updated before rendering
    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value, readOnly: nextProps.readOnly});
    }

    render() {
        if (this.state.readOnly) {
            return (
                <div><input className="btn btn-primary" type="button" value="Edit" onClick={this.onEditHandler} /> {"" + this.state.value}</div>
            )
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <input className="btn btn-danger" type="button" value="Cancel" onClick={this.onEditHandler} />
                    <input className="btn btn-success" type="submit" value="Save" /> <select value={this.state.value} onChange={this.handleSelectChange}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </form>
            )
        }

    }
}