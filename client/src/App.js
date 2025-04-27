import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { myStore } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './component/navBar';
import { Routing } from './component/routing';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Provider store={myStore}>
        <BrowserRouter>
        <NavBar></NavBar>
        <Routing></Routing>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
