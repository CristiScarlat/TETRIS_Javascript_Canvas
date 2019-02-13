import React, { Component } from 'react';
import './App.css';
import Tetris from './components/tetris';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tetris/>
      </div>
    );
  }
}

export default App;
