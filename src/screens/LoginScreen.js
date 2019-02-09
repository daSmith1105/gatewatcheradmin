import React from 'react';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submittedData: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ 
            submittedData: `Submitted > username: ${ this.state.username } > password: ${ this.state.password }`
        })
        setTimeout(function() {
            this.setState({ 
                submittedData: '',
                username: '',
                password: ''
            })
        }.bind(this), 5000)
    }
        render() {
            return (
            <div>
                <h1>Gate Tracker</h1>
                <p>Desktop Version</p>
                <form onSubmit={ this.handleSubmit }>
                    <label>
                        Username:
                        <input type="text" 
                               name="username" 
                               value={ this.state.username }
                               onChange={ this.handleChange }/>
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="text" 
                               name="password" 
                               value={ this.state.password }
                               onChange={ this.handleChange }/>
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
                <p>{ this.state.submittedData } </p>
            </div>
            );
        }
    }
        