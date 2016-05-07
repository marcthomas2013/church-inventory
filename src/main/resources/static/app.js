import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
const React = require('react');

const OrganisationPage = require('./components/organisation/OrganisationPage');
const ItemPage = require('./components/item/ItemPage');
const RoomPage = require('./components/room/RoomPage');
const StoragePage = require('./components/storage/StoragePage');

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
), document.getElementById('react'))
