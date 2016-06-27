import React from 'react';
import client from '../../client';

export default class OrganisationControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {organisationName: "", readOnly: this.props.readOnly, organisationLink: this.props.self, organisations: this.props.organisations, field: this.props.field};

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.props.onChangeHandler(e.target.value, this.state.field);
    }

    componentDidMount() {
        this.loadFromServer(this.state.readOnly, this.state.organisationLink);
    }

    loadFromServer(readOnly, self) {
        this.result = client({
            method: 'GET',
            path: self
        }).then(result => {
            this.setState({organisationName: result.entity.name, readOnly: readOnly, organisationLink: self});
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
                    <a href="#organisation">{this.state.organisationName}</a>
                </div>
            )
        } else {
            var options = this.state.organisations.map(organisation => {
                return (<option key={organisation._links.self.href} value={organisation._links.self.href}>{organisation.name}</option>);
            });

            return (
                <div>
                    <select value={this.state.organisationLink}
                            className="form-control"
                            onChange={this.onChangeHandler}>
                        {options}
                    </select>
                </div>
            )
        }
    }
}