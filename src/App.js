import React, { Component } from 'react';
import './App.css';
import LoginScreen from './screens/LoginScreen';
import AdminScreen from './screens/AdminScreen';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <LoginScreen /> */}
        <AdminScreen />
      </div>
    );
  }
}

export default App;
