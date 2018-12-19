import React, { Component } from 'react';
import logo from './logo.svg';
import Button from "@material-ui/core/Button"
class App extends Component {
  render() {
    return (
      <Button variant="contained" color="secondary">
        Pixabay Image Finder
        <img src={logo} className="App-logo" alt="logo" width="56px"/>
      </Button>
    )
  }
}

export default App;
