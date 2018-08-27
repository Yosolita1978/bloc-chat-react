import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
  constructor(props){
    super(props);

    this.state={
      activeRoom:"",
      activeUser: null
    }

    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    if(room === null){
      this.setState({activeRoom:""});

    } else {
      this.setState({ activeRoom: room });
      console.log("SetActiveRoom funtion: ", this.state.activeRoom.name);
    }


    }

  setUser(user) {
      this.setState({ activeUser: user })
    }

  render() {

    return (
      <div className="App">
        <div className="sidebar">
          <h1 className="sidebarH1">Bloc Chat</h1>
          <RoomList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          setActiveRoom={this.setActiveRoom}/>
        </div>
        <div className="main">
        <User
        firebase={firebase}
        setUser={this.setUser}
        user={this.state.activeUser}
        />

         <h2>{this.state.activeRoom.name|| "Select a Room"}</h2>
         { this.state.activeRoom.name ?
           <MessageList firebase={ firebase }  activeRoom={this.state.activeRoom} currentUser={this.state.activeUser} />
         : <h3> Select an existent Room </h3>
         }

         </div>
      </div>
    );
  }
}

export default App;
