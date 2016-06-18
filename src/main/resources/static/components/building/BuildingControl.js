import React from 'react';
import client from '../../client';

export default class BuildingControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {buildingName: ""};
    }

    componentDidMount() {
        this.buildingLink = this.props.building;
        this.loadFromServer();
    }

    loadFromServer() {
        this.result = client({
            method: 'GET',
            path: this.buildingLink
        }).then(result => {
            this.setState({buildingName: result.entity.name});
            return result;
        });
    }

    render() {
        return (
            <div>
                <a href="#building">{this.state.buildingName}</a>
            </div>
        )
    }
}