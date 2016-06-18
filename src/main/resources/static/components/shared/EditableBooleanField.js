import React from 'react';

export default class EditableBooleanField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {originalValue: this.props.value, value: this.props.value, field: this.props.field, readOnly: this.props.readOnly};

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.props.onChangeHandler(e.target.value === 'true', this.state.field);
    }

    // Ensure the state of the component is updated before rendering
    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value, readOnly: nextProps.readOnly});
    }

    render() {
        if (this.state.readOnly) {
            if(this.state.value) {
                return (<div className="glyphicon glyphicon-ok" aria-hidden="true"></div>)
            } else {
                return (<div className="glyphicon glyphicon-remove" aria-hidden="true"></div>)
            }
        } else {
            return (
                <div>
                    <select value={this.state.value}
                                                                                                    className="form-control"
                                                                                                    onChange={this.onChangeHandler}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
            )
        }

    }
}