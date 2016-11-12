import React from 'react';
import client from '../../client';

export default class BuildingControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {buildingName: "", readOnly: this.props.readOnly, buildingLink: this.props.self, buildings: this.props.buildings, field: this.props.field};

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    onChangeHandler(e) {
        e.preventDefault();
        this.props.onChangeHandler(e.target.value, this.state.field);
    }

    componentDidMount() {
        this.loadFromServer(this.state.readOnly, this.state.buildingLink);
    }

    loadFromServer(readOnly, self) {
        this.result = client({
            method: 'GET',
            path: self
        }).then(result => {
            this.setState({buildingName: result.entity.name, readOnly: readOnly, buildingLink: self});
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
                    <a href="#building">{this.state.buildingName}</a>
                </div>
            )
        } else {
            var options = this.state.buildings.map(building => {
                return (<option key={building._links.self.href} value={building._links.self.href}>{building.name}</option>);
            });

            return (
                <div>
                    <select value={this.state.buildingLink}
                            className="form-control"
                            onChange={this.onChangeHandler}>
                        {options}
                    </select>
                </div>
            )
        }
    }
}