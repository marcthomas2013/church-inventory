import React from 'react';

export default class EditableBooleanField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value, field: this.props.field, readOnly: this.props.readOnly};

        this.handleSubmit = this.handleSubmit.bind(this);
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

    // Ensure the state of the component is updated before rendering
    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value, readOnly: nextProps.readOnly});
    }

    render() {
        if (this.state.readOnly) {
            return (
                <div>{"" + this.state.value}</div>
            )
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <select value={this.state.value} onChange={this.handleSelectChange}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    <input type="submit" value="Save" />
                </form>
            )
        }

    }
}