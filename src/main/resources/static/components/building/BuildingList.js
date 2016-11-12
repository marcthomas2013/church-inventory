import React from 'react';
import Building from './BuildingRow';

export default class BuildingList extends React.Component {
    render() {
        var buildings = this.props.buildings.map(building =>
            <Building onUpdate={this.props.onUpdate} key={building._links.self.href} building={building}/>
        );
        return (
            <table className="table table-striped table-bordered">
                <tbody>
                <tr>
                    <th></th>
                    <th>Building Name</th>
                </tr>
                {buildings}
                </tbody>
            </table>
        )
    }
}