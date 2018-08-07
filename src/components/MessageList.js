import React, { Component } from 'react';

class MessageList extends Component{
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      username: '',
      content: '',
      sentAt: '',
      roomId: ''
    };

    this.messagesRef = this.props.firebase.database().ref("Messages");
    this.handleMessageChange=this.handleMessageChange.bind(this);
    this.createMessage=this.createMessage.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  handleMessageChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.currentUser,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.setActiveRoom
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({ username: '', content: '', sentAt: '', roomId: ''});
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
        <div id="new-message">
        { this.props.activeRoom && this.props.user !== null ?
        <form>
          <textarea
            placeholder="Write your message here..."
            value={this.state.content}
            onChange={this.handleMessageChange}
          />
          <input
            type="submit"
            value="Send"
            onClick={this.createMessage}>
          </input>
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
