import React, { Component } from 'react';
import AuthService from './AuthService';

const Auth = new AuthService('http://localhost:8000');

export default function withAuth(AuthComponent) {
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                try {
                    const profile = Auth.getProfile();
                    console.log('getProfile:', profile);
                    this.setState({
                        user: profile
                    })
                }
                catch(err){
                    Auth.logout();
                    this.props.history.replace('/login')
                }
            }
        }

        render() {
            console.log('State: ', this.state.username);
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            }
            else {
                return null
            }
        }
    };
}

