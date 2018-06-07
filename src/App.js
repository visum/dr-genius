import React, { Component } from 'react';
import './App.css';

import Welcome from "./components/Welcome";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dr. Genius</h1>
        </header>
        <Welcome />
      </div>
    );
  }
}

export default App;
