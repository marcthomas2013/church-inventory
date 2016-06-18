import React from 'react';

export default class EditableTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value, field: this.props.field, readOnly: this.props.readOnly, visible: (this.props.visible === undefined ? true : this.props.visible)};

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.props.onChangeHandler(e.target.value, this.state.field);
    }

    // Ensure the state of the component is updated before rendering
    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value, readOnly: nextProps.readOnly, visible: (nextProps.visible === undefined ? true : nextProps.visible) });
    }

    render() {
        if (this.state.readOnly) {
            return (
                <div>{this.state.visible ? this.state.value : "N/A"}</div>
            )
        } else {
            if (this.state.visible) {
                return (<div>
                    <input type="text"
                           placeholder="Your Value"
                           value={this.state.value}
                           onChange={this.onChangeHandler}/>
                </div>)
            } else {
                return (<div>N/A</div>)
            }
        }
    }
}