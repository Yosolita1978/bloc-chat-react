import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import './App.css';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyABpuZWA317yfU7MtpWTRfCrTCjTVDS6G8",
    authDomain: "chat-rooms-77e50.firebaseapp.com",
    databaseURL: "https://chat-rooms-77e50.firebaseio.com",
    projectId: "chat-rooms-77e50",
    storageBucket: "chat-rooms-77e50.appspot.com",
    messagingSenderId: "914017118772"
  };
  firebase.initializeApp(config);

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <h1 className="sidebarH1">Bloc Chat</h1>
          <RoomList firebase={firebase} />
        </div>
        <div className="main">
        </div>
      </div>
    );
  }
}

export default App;
