const React = require('react');
const client = require('./client');

const follow = require('./follow'); // function to hop multiple links by "rel"

const root = '/api';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.state = {items: [], attributes: [], pageSize: 2, links: {}};
    }

    loadFromServer(pageSize) {
        follow(client, root, [
            {rel: 'items', params: {size: pageSize}}]
        ).then(itemCollection => {
            return client({
                method: 'GET',
                path: itemCollection.entity._links.profile.href,
                headers: {'Accept': 'application/schema+json'}
            }).then(schema => {
                this.schema = schema.entity;
                return itemCollection;
            });
        }).done(itemCollection => {
            this.setState({
                items: itemCollection.entity._embedded.items,
                attributes: Object.keys(this.schema.properties),
                pageSize: pageSize,
                links: itemCollection.entity._links});
        });
    }

    componentDidMount() {
        this.loadFromServer(this.state.pageSize);
    }

    onCreate(newItem) {
        follow(client, root, ['items']).then(itemCollection => {
            return client({
                method: 'POST',
                path: itemCollection.entity._links.self.href,
                entity: newItem,
                headers: {'Content-Type': 'application/json'}
            })
        }).then(response => {
            return follow(client, root, [
                {rel: 'items', params: {'size': this.state.pageSize}}]);
        }).done(response => {
            this.onNavigate(response.entity._links.last.href);
        });
    }

    render() {
        return (
            <div>
                <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                <ItemList items={this.state.items}/>
            </div>
        )
    }
}

class ItemList extends React.Component {
    render() {
        var items = this.props.items.map(item =>
            <Item key={item._links.self.href} item={item}/>
        );
        return (
            <table>
                <tr>
                    <th>Item Name</th>
                    <th>Description</th>
                    <th>Notes</th>
                    <th>Value</th>
                    <th>Is Asset</th>
                    <th>Reference</th>
                    <th>Storage</th>
                    <th>Organisation</th>
                </tr>
                {items}
            </table>
        )
    }
}

class Item extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.description}</td>
                <td>{this.props.item.notes}</td>
                <td>{this.props.item.value}</td>
                <td>{this.props.item.isAsset}</td>
                <td>{this.props.item.reference}</td>
                <td>{this.props.item.storage}</td>
                <td>{this.props.item.organisation}</td>
            </tr>
        )
    }
}

class CreateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var newItem = {};
        this.props.attributes.forEach(attribute => {
            newItem[attribute] = React.findDOMNode(this.refs[attribute]).value.trim();
        });
        this.props.onCreate(newItem);

        // clear out the dialog's inputs
        this.props.attributes.forEach(attribute => {
            React.findDOMNode(this.refs[attribute]).value = '';
        });

        // Navigate away from the dialog to hide it.
        window.location = "#";
    }

    render() {
        var inputs = this.props.attributes.map(attribute =>
            <p key={attribute}>
                <input type="text" placeholder={attribute} ref={attribute} className="field" />
            </p>
        );

        return (
            <div>
                <a href="#createItem">Create</a>

                <div id="createItem" className="modalDialog">
                    <div>
                        <a href="#" title="Close" className="close">X</a>

                        <h2>Create new item</h2>

                        <form>
                            {inputs}
                            <button onClick={this.handleSubmit}>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

React.render(
    <App />,
    document.getElementById('react')
)