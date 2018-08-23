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

    this.messagesRef = this.props.firebase.database().ref("Messages");
    this.handleChange=this.handleChange.bind(this);
    this.createMessage=this.createMessage.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const messages = snapshot.val();
      messages.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( messages ) });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.currentUser.displayName,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key
    })
    // console.log(this.state);
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
    this.setState({ content: "" });
  }

  formatTime(time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const timestamp = month + ' ' + day + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return timestamp;
  }

  deleteMessage(messageKey) {
    // console.log('trying to delete message', messageKey);
    const message = this.props.firebase.database().ref('messages' + messageKey);
    message.remove()
    const remainMessages= this.state.messages
      .filter(message => message.key !== messageKey);
      this.setState({ messages: remainMessages});
  }



  render(){

    return (
      <div className="message-list">
        <div className="message-group">
          <h1>Messages</h1>
          {this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map((message, index) =>
            <div key={message.key} className="messages">
              <p id="username">Username: {message.username}</p>
              <p id="content">Message: {message.content}</p>
              <p id="timestamp">Timestamp: {this.formatTime(message.sentAt)}</p>
              <button onClick={ () => this.deleteMessage(message.key) }>Delete Message</button>
            </div>
            )}
        </div>
        <div  className="form-inline" id="new-message">
        { this.props.activeRoom && this.props.user !== null ?
          <form className="form-group" onSubmit={this.handleMessageSubmit}>
              <label>
                New Message:
                <input className="form-control" type="text" value={this.state.content} onChange={this.handleChange} placeholder="Enter Message" />
              </label>
              <input className="btn-submit" type="submit" value="submit" />
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
