import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import React from 'react';

import OrganisationPage from './components/organisation/OrganisationPage';
import ItemPage from './components/item/ItemPage';
import RoomPage from './components/room/RoomPage';
import StoragePage from './components/storage/StoragePage';
import BuildingPage from './components/building/BuildingPage';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Church Inventory System</h1>
                <p class="lead">This system will allow you to find where anything should be stored in the church.<br/>Click on items to see the full list of all items.</p>
            </div>
        )
    }
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={ItemPage}/>
        <Route path="/item" component={ItemPage}/>
        <Route path="/room" component={RoomPage}/>
        <Route path="/organisation" component={OrganisationPage}/>
        <Route path="/items" component={ItemPage}/>
        <Route path="/storage" component={StoragePage}/>
        <Route path="/building" component={BuildingPage}/>
    </Router>
), document.getElementById('react'));
