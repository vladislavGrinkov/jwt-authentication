import React, { Component } from 'react';
import AuthService from "./component/AuthService/AuthService";
import withAuth from "./component/AuthService/withAuth";
import './App.css'

const Auth = new AuthService();
class App extends Component {

  handleLogout(){
    Auth.logout();
    this.props.history.replace('/login');
  }

  render() {
    return (
        <div className={'block'}>
          <div>
            <h2>Welcome {this.props.user.username}</h2>
          </div>
          <p>
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
          </p>
        </div>
    );
  }
}

export default withAuth(App);
