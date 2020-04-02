import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import LocationMap from './components/Map'
import Uploader from './components/Uploader'
import { store } from './components/Redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <Uploader />
        <LocationMap />
      </Provider>
    </div>
  );
}

export default App;
