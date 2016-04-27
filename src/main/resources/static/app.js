const React = require('react');
const client = require('./client');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {items: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/item'}).done(
            response => {
            this.setState({items: response.entity._embedded.item});
        });
    }

    render() {
        return (
            <ItemList items={this.state.items}/>
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
            </tr>
        )
    }
}

React.render(
    <App />,
    document.getElementById('react')
)