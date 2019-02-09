import React from 'react';

class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            username: '',
            password: '',
            customerId: '',
            fAdmin: false,
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    handleChange(e) {
       let target = e.target.name;
       let value = e.target.value;
       this.setState({ [target]: value })
    }

    handleClear() {
        this.setState({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            username: '',
            password: '',
            customerId: '',
            isAdmin: false,
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleAddUser(e) {
        e.preventDefault();

        fetch('/api/gateuser/' + this.state.customerId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sFirstName: this.state.firstName.trim(),
                sLastName: this.state.lastName.trim(),
                sPhone: this.state.phone.trim(),
                sEmail: this.state.email.trim(),
                sUsername: this.state.username.trim(),
                sPassword: this.state.password.trim(),
                fAdmin: this.state.isAdmin

            })
        })
        .then(res => res.json())
        .then(res => console.log('Success:', JSON.stringify(res)))
        .catch(error => console.error('Error:', error));

        this.props.updateCustomerTable()
 
    }

    render() {
        return(
            <div>
                <h1>Add User</h1>
                <form onSubmit={ this.handleAddUser }>

                <label>Customer ID:</label>
                <input
                    type="text"
                    placeholder="enter custoemr Id"
                    name="customerId"
                    value={ this.state.customerId }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>First Name:</label>
                <input
                    type="text"
                    placeholder="enter first name"
                    name="firstName"
                    value={ this.state.firstName }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>Last Name:</label>
                <input
                    type="text"
                    placeholder="enter last name"
                    name="lastName"
                    value={ this.state.lastName }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>Phone:</label>
                <input
                    type="phone"
                    placeholder="enter phone"
                    name="phone"
                    value={ this.state.phone }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>Email:</label>
                <input
                    type="email"
                    placeholder="enter email"
                    name="email"
                    value={ this.state.email}
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>Username:</label>
                <input
                    type="text"
                    placeholder="enter username"
                    name="username"
                    value={ this.state.username }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>Password:</label>
                <input
                    type="password"
                    placeholder="enter password"
                    name="password"
                    value={ this.state.password }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>Admin:</label>
                <input
                    type="checkbox"
                    name="isAdmin"
                    onChange={ () => this.setState({ isAdmin: !this.state.isAdmin }) } />
                <br/>

                <input type="submit" value="Add User" />
                </form>
            </div>
        )
    }
}

export default AddUser;
