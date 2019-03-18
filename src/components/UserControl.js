import React from 'react';
import ReactTable from 'react-table';
import AddUser from './AddUser';
import EditUser from './EditUser';
import '../App.css';


class UserControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showAddUser: false,
            showEditUser: false,
            rowData: []
        }

        this.customFilter = this.customFilter.bind(this);
        this.toggleAddUser = this.toggleAddUser.bind(this);
        this.closeAddUser = this.closeAddUser.bind(this);
        this.toggleEditUser = this.toggleEditUser.bind(this);
        this.closeEditUser = this.closeEditUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    componentDidMount() {
        if(this.props.isMaster) {
            this.props.getAllUsers();
        }
        if(this.props.isAdmin) {
            this.props.getAllUsersByCustomer();
        }
    }

    customFilter = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null && typeof row[id] === "string") {
          return (row[id] !== undefined
            ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            : true);
        }
      }

    toggleAddUser() {
        this.setState({
            showAddUser: true
        })
    }

    closeAddUser() {
        this.setState({
            showAddUser: false
        })
    }

    toggleEditUser(data) {
        this.setState({
            showEditUser: true,
            rowData: data
        })
    }

    closeEditUser() {
        this.setState({
            showEditUser: false
        })
    }

    handleDeleteUser(data) {
        console.log('/api/gateuserdestroy/' + data.id.toString())
        fetch('/api/gateuserdestroy/' + data.id.toString(), {
            method: 'DELETE' 
        })
        .then(res => res.json())
        .then(res => {
            console.log('Success:', JSON.stringify(res))
            if(this.props.isMaster) {
                this.props.getAllUsers()
            }
            if(this.props.isAdmin) {
                this.props.getAllUsersByCustomer()
            }
        })
        .catch(error => {
            console.error('Error:', error)
            alert('delete user failed')
        });
    }

    render() {
        console.log(this.props.users)
        const columns = [{
            Header: 'Name',
            accessor: d => `${d.sFirstName} ${d.sLastName}`,
            width: 220,
            id: "name",
            Filter: ({filter, onChange}) => (
                <input
                    onChange={event => onChange(event.target.value)}
                    value={filter ? filter.value : ''}
                    placeholder={'Search ...'}
                    style={{
                        width: '100%',
                        backgroundColor: 'lightgrey',
                        color: 'black',
                    }}
                />
            ),
        }, {
            Header: 'Access Group',
            accessor: 'GateAcl.sName',
            width: 200,
            id: "access",
            Filter: ({filter, onChange}) => (
                <input
                    onChange={event => onChange(event.target.value)}
                    value={filter ? filter.value : ''}
                    placeholder={'Search ...'}
                    style={{
                        width: '100%',
                        backgroundColor: 'lightgrey',
                        color: 'black',
                    }}
                />
            ),
        }, {
            Header: 'Username',
            accessor: 'sUsername',
            width: 200,
            id: "username",
            Filter: ({filter, onChange}) => (
                <input
                    onChange={event => onChange(event.target.value)}
                    value={filter ? filter.value : ''}
                    placeholder={'Search ...'}
                    style={{
                        width: '100%',
                        backgroundColor: 'lightgrey',
                        color: 'black',
                    }}
                />
            ),
        }, {
            Header: 'Password',
            accessor: 'sPassword',
            width: 200,
            id: "password",
            filterable: false,
            Cell: row => (
                <span>* * * * * * * *</span>
            )
        }, {
            Header: 'Customer',
            accessor: 'GateCustomer.sName',
            width: 200,
            id: "customer",
            Filter: ({filter, onChange}) => (
                <input
                    onChange={event => onChange(event.target.value)}
                    value={filter ? filter.value : ''}
                    placeholder={'Search ...'}
                    style={{
                        width: '100%',
                        backgroundColor: 'lightgrey',
                        color: 'black',
                    }}
                />
            ),
        }, {
            Header: 'Actions',
            accessor: '',
            width: 200,
            id: "actions",
            filterable: false,
            sortable: false,
            Cell: row => (
                <div>
                    <button onClick={() => this.toggleEditUser(row.original)}>Edit</button>
                    <button onClick={() => this.handleDeleteUser(row.original)}>Delete</button>
                </div>
            )
        }];

        return(
            <div className="adminControl">
                { !this.state.showAddUser && !this.state.showEditUser ?
                    <div>
                        <p>User Control</p>
                        <ReactTable
                            data={ this.props.users }
                            columns={columns}
                            filterable
                            defaultFilterMethod={ this.customFilter }
                            style={{
                                height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                              }}
                            defaultPageSize={20}
                            className="-striped -highlight adminEditTable"
                        />
                        <br/><br/>
                        <div className="addButtonContainer">
                            <button onClick={ this.props.closeAdminControl }>Cancel</button> 
                            <button onClick={ () => this.toggleAddUser() }>Add User</button> 
                        </div>
                    </div> :
                    null
                }
                

                { this.state.showAddUser ? 
                    <AddUser closeAddUser={ this.closeAddUser }
                             getAllUsers={ this.props.getAllUsers }
                             getAllUsersByCustomer={ this.props.getAllUsersByCustomer }
                             customers={ this.props.customers }
                             authTypes={ this.props.authTypes }
                             customerId={ this.props.customerId }
                             customerName={ this.props.customerName }
                             isMaster={ this.props.isMaster }
                             isAdmin={ this.props.isAdmin } /> :
                    null
                }
                 { this.state.showEditUser ? 
                    <EditUser   closeEditUser={ this.closeEditUser }
                                getAllUsers={ this.props.getAllUsers }
                                getAllUsersByCustomer={ this.props.getAllUsersByCustomer }
                                customers={ this.props.customers }
                                authTypes={ this.props.authTypes }
                                customerId={ this.props.customerId }
                                customerName={ this.props.customerName }
                                rowData={ this.state.rowData }
                                isMaster={ this.props.isMaster }
                                isAdmin={ this.props.isAdmin }  /> :
                    null
                }
            </div>
        )
    }
}

export default UserControl;
