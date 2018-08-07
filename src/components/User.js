import React, { Component } from 'react';


class User extends Component  {
  constructor(props) {
    super(props)
     this.state = {
      user: ''
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

   signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

   signOut() {
    this.props.firebase.auth().signOut();
  }

   componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    })
  }

   render() {
    const currentUser = this.props.user === null ? "Guest" : this.props.user.displayName
     return (
      <div className="username">
        <span>Logged in as: {currentUser}</span>
        <div className="buttons">
        <button type="button" className="signuser" onClick={this.signIn}>
          Sign-in
        </button>
        <button type="button" className="signuser" onClick={this.signOut}>
          Logout
        </button>
        </div>
      </div>
    )
  }
}
 export default User;
