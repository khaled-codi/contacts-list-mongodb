import React from 'react'
import './App.css';

class App extends React.Component {

  state = {
    contacts: []
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8000/contacts');
    const contacts = await response.json();
    this.setState({ contacts });
  }

  render() {
    return (
      <div className="App">
        <ul>
          {
            this.state.contacts.map(contact => <li key={contact._id}>{contact.name}</li>)
          }
        </ul>
      </div>
    );
  }
}

export default App;
