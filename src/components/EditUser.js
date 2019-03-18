import React from 'react';

class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            customerId: '',
            typeId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
            showEditUser: false,
        }
        this.handleEditUser = this.handleEditUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshUserList = this.refreshUserList.bind(this);
    }
    componentDidMount() {
        this.setState({
            userId: this.props.rowData.id,
            firstName: this.props.rowData.sFirstName,
            lastName: this.props.rowData.sLastName,
            username: this.props.rowData.sUsername,
            password: this.props.rowData.sPassword,
            customerId: this.props.rowData.GateCustomer.id,
            typeId: this.props.rowData.GateAcl.id,
        })
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllUsers();
        }
        if(this.props.isAdmin) {
            this.props.getAllUsersByCustomer();
        }
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
            username: '',
            password: '',
            customerId: '',
            typeId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
            showEditUser: false,
        })
    }

  handleEditUser(e) {
        e.preventDefault();
        fetch('/api/gateuserupdate/' + this.state.userId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sFirstName: this.state.firstName.trim(),
                sLastName: this.state.lastName.trim(),
                sUsername: this.state.username.trim(),
                sPassword: this.state.password.trim(),
                bAuthID: this.state.typeId,
                bCustomerID: this.state.customerId
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log('Success:', JSON.stringify(res))
            this.setState({ success: true,})
        })
        .catch(error => {
            console.error('Error:', error)
            this.setState({ fail: true,})
        });
    }

    refreshUserList() {
        this.props.closeEditUser()
        this.setState({ 
            success: false,
            fail: false
        })
    }

    render() {
        return(
            <div className="addModal">
                 { this.state.success ? 
                    <div className="postNotification">
                        <div className="postNotificationContainer">
                            <p>User Edit Successful!</p>
                            <button onClick={ () => this.refreshUserList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>User Edit Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshUserList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                <div>
                    <h1>Edit User</h1>
                    <form onSubmit={ this.handleEditUser }>

              
                    <label>Customer:</label>
                    { this.props.isMaster ?
                        <select value={this.state.customerId} onChange={(e) => this.setState({ customerId: e.target.value})}>
                            {this.props.customers.map( customer => 
                                <option key={ customer.id } value={ customer.id }>{ customer.sName }</option>)
                            }  
                    </select> : <span>{ this.props.customerName }</span> }
                    <br/>

                    <label>First Name:</label>
                    <input
                        type="text"
                        placeholder="enter first name"
                        name="firstName"
                        value={ this.state.firstName }
                        onChange={ this.handleChange } />
                    <br/>

                    <label>Last Name:</label>
                    <input
                        type="text"
                        placeholder="enter last name"
                        name="lastName"
                        value={ this.state.lastName }
                        onChange={ this.handleChange } />
                    <br/>

                    <label>Username:</label>
                    <input
                        type="text"
                        placeholder="enter username"
                        name="username"
                        value={ this.state.username }
                        onChange={ this.handleChange } />
                    <br/>

                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="enter password"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handleChange } />
                    <br/>

                    <label>Access Group:</label>
                        <select value={this.state.typeId} onChange={(e) => this.setState({ typeId: e.target.value })}>
                            {this.props.authTypes.map( type => 
                                <option key={ type.id } value={ type.id }>{ type.sName }</option>)
                            }  
                        </select>
                    <br/>
                    <div className="addModalButtonContainer">
                        <button onClick={ () => this.props.closeEditUser() }>Cancel</button>
                        <input type="submit" value="Save User" />
                    </div>
                    </form>
                    </div> :
                    null
                }
            </div>
        )
    }
}

export default EditUser;