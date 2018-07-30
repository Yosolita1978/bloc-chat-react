import React, { Component } from 'react';

class MessageList extends Component{
  constructor(props){
    super(props);
    this.state = {
        	messages:[],
        	newMessage: ""
        }

    this.messagesRef = this.props.firebase.database().ref("Messages");
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const messages = snapshot.val();
      this.setState({ messages: this.state.messages.concat( messages ) });
    });
  }

  render(){
    return (
      <div className="message-list">
        <h2 className="room-name">{this.props.activeRoom ? this.props.activeRoom.name : 'Please select a room' }</h2>
        <div className="message-group">
          <h1>Messages</h1>
          {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
            <div key={index} className="messages">
              <p id="username">Username: {message.username}</p>
              <p id="content">Message: {message.content}</p>
              <p id="timestamp">Timestamp: {message.sentAt}</p>
            </div>
            )}
        </div>
        </div>
  );
}
}

export default MessageList;
