import React from 'react';

export default class EditableTextField extends React.Component {
    constructor(props) {
        super(props);
        // Need to keep a store of the originalValue as well so that if the editing is canceled then we can put the value back.
        this.state = {originalValue: this.props.value, value: this.props.value, field: this.props.field, readOnly: this.props.readOnly};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var value = this.state.value;
        this.state.originalValue = this.state.value;
        this.props.handleFormSubmit(value, this.state.field);
    }

    handleTextChange(e) {
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
                <div><input className="btn btn-primary btn-xs" type="button" value="Edit" onClick={this.onEditHandler} /> {this.state.value}
                </div>
            )
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <input className="btn btn-danger btn-xs" type="button" value="Cancel" onClick={this.onEditHandler} />
                    <input className="btn btn-success btn-xs" type="submit" value="Save" /> <input type="text" className="form-control"
                           placeholder="Your Value"
                           value={this.state.value}
                           onChange={this.handleTextChange}/>
                </form>
            )
        }

    }
}