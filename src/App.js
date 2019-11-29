import React, { Component } from 'react';
import Signin from './Signin.js';
import SignedIn from './SignedIn.js';
import {
  UserSession
} from 'blockstack';

export default class App extends Component {

  state = {
    userSession : new UserSession()
  }

  componentWillMount() {
    const session = this.state.userSession
    if(!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn()
      .then((userData) => {
        if(!userData.username) {
          throw new Error('This app requires a username.')
        }
        window.location = `/cards`
      })
    }
  }

  render() {
    return (
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          { !this.state.userSession.isUserSignedIn() ?
            <Signin />
            : <SignedIn />
          }
        </div>
      </div>
    );
  }
}
