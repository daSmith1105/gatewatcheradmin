import React from 'react';
import '../App.css';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            userData: '',
            error: false,
            success: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        const username = this.state.username.trim();
        const password = this.state.password.trim();
        fetch('/api/finduser/' + username + '/' + password )
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then(response => response.json())
        .then( data => {
                this.setState({ 
                    userData: data,
                    success: true
                },
                () => this.props.getUserData( this.state.userData ))
        })
        .catch(error => {
            console.error('Error:', error);
            this.setState({ error: true })
            })
        }
    
        render() {
            return (
            <div>
                <h1>Gate Tracker</h1>
                { this.state.error ? 
                <div>
                    <p className="loginError">Username or Password Incorrect. Please retry.</p>
                </div> :
                null }

                <form onSubmit={ this.handleSubmit } autoComplete="on">
                    <label>
                        Username:
                        <input type="text" 
                               name="username" 
                               placeholder="enter username"
                               value={ this.state.username }
                               onChange={ this.handleChange }
                               required />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" 
                               name="password" 
                               autoComplete="off"
                               placeholder="enter password"
                               value={ this.state.password }
                               onChange={ this.handleChange }
                               required />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            );
        }
    }
        