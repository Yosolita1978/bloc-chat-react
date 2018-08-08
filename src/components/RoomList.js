import React, { Component } from 'react';



class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        rooms: [],
        newRoomName: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) })
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newRoomName) return
    this.roomsRef.push({ name: this.state.newRoomName })
    this.setState({ newRoomName: ''})
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  deleteRoom = (e, room, index) => {
    e.preventDefault();
    this.roomsRef.child(room.key).remove();

    this.state.rooms.splice(index, 1);
    this.setState({rooms: this.state.rooms})
  }


  render() {
    return(
        <div className="room-list">
        <section >
        {this.state.rooms.map((room, index) =>
              <div className="room-data"
                key={index}
                onClick={() => this.props.setActiveRoom(room)}>
                {room.name}
                <button className="btn-delete" onClick={(e) => this.deleteRoom(e, room, index)}>Delete Room</button>
              </div>

          )}
        </section>
        <div className="new-room">
            <form onSubmit={ (e) => this.handleSubmit(e) }>
              <label>
                Room Name:
                <input
                  type="text"
                  placeholder=" Enter room name here"
                  value={this.state.newRoomName}
                  onChange={ (e) => this.handleChange(e) }/>
              </label>
              <input type="submit" value="submit" />
            </form>
          </div>
      </div>
    );
  }
}

export default RoomList;
