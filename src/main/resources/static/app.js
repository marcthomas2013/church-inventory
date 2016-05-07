import { Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import React from 'react';

import OrganisationPage from './components/organisation/OrganisationPage';
import ItemPage from './components/item/ItemPage';
import RoomPage from './components/room/RoomPage';
import StoragePage from './components/storage/StoragePage';

import EditableTextField from './components/shared/EditableTextField';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {value: 1, readOnly: true};
    }

    onClickHandler() {
        this.setState({value: ++this.state.value});
    }

    onEditHandler() {
        this.setState({readOnly: !this.state.readOnly});
    }

    handleFormSubmit(fieldValue) {
        this.setState({value: fieldValue, readOnly: true});
    }

    render() {
        return (
            <div>
                <p>This system will allow you to find where anything should be stored in the church. Click on items to see the full list of all items.</p>

                <input type="button" value="Increment" onClick={this.onClickHandler} />
                <br/>
                <input type="button" value="Toggle Edit" onClick={this.onEditHandler} />
                <br/>
                <EditableTextField value={this.state.value} readOnly={this.state.readOnly} handleFormSubmit={this.handleFormSubmit}/>
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
