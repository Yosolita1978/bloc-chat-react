import React, { Component } from 'react';

class MessageList extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      messages: []
    }

    this.messagesRef = this.props.firebase.database().ref("messages");
    this.handleChange=this.handleChange.bind(this);
    this.createMessage=this.createMessage.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const messages = snapshot.val();
      this.setState({ messages: this.state.messages.concat( messages ) });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.currentUser,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    })
  }

  createMessage(e) {
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.props.activeRoom.key
    })
    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    })
  }

  handleMessageSubmit(e) {
    e.preventDefault();
    this.createMessage();
    this.setState({
      content: "",
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
     });
  }

  render(){
    console.log(this.state.message);
    let activeRoom = this.props.activeRoom.roomId;
    console.log(activeRoom);
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
        <div id="new-message">
        { this.props.activeRoom && this.props.user !== null ?
          <form onSubmit={this.handleMessageSubmit}>
              <label>
                New Message:
                <input type="text" value={this.state.content} onChange={this.handleChange} placeholder="Enter Message" />
              </label>
              <input type="submit" value="submit" />
            </form>
            :
            <h3>Sign in and Select a Room to send a Message</h3>

          }
        </div>
        </div>
  );
}
}

export default MessageList;
