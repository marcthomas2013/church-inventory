import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import React from 'react';

import OrganisationPage from './components/organisation/OrganisationPage';
import ItemPage from './components/item/ItemPage';
import RoomPage from './components/room/RoomPage';
import StoragePage from './components/storage/StoragePage';

class App extends React.Component {
    render() {
        return (
            <div>
            </div>
        )
    }
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/item" component={ItemPage}/>
        <Route path="/room" component={RoomPage}/>
        <Route path="/organisation" component={OrganisationPage}/>
        <Route path="/items" component={ItemPage}/>
        <Route path="/storage" component={StoragePage}/>
    </Router>
), document.getElementById('react'));
