import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import SecondNav from './Components/SecondNav/SecondNav';

function App() {
  return (
    <div className="App"> 
      <Navbar />
      <SecondNav />
      <main>
        <Login />
      </main>
    </div>
  );
}

export default App;