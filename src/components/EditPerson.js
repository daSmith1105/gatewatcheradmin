import React from 'react';

class EditPerson extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            companyId: '',
            customerId: '',
            groupId: '',
            flagged: 0,
            lpnId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleEditPerson = this.handleEditPerson.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshPersonList = this.refreshPersonList.bind(this);
        this.toggleFlagged = this.toggleFlagged.bind(this);
    }

    componentDidMount() {
        this.setState({
            personId: this.props.rowData.id,
            firstName: this.props.rowData.sFirstName,
            lastName: this.props.rowData.sLastName,
            companyId: this.props.rowData.GateCompany.id,
            groupId: this.props.rowData.GateGroup.id,
            flagged: this.props.rowData.fFlagged,
            lpnId: this.props.rowData.GateLPN.id,
            customerId: this.props.rowData.GateCustomer.id,
        })
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllPeople();
        }
        if(this.props.isAdmin) {
            this.props.getAllPeopleByCustomer();
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
            companyId: '',
            customerId: '',
            groupId: '',
            flagged: 0,
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleEditPerson(e) {
        e.preventDefault();
        fetch('/api/gatepersonupdate/' + this.state.personId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sFirstName: this.state.firstName.trim(),
                sLastName: this.state.lastName.trim(),
                bCustomerID: this.state.customerId,
                bCompanyID: this.state.companyId,
                bGroupID: this.state.groupId,
                fFlagged: this.state.flagged,
                bLpnID: this.state.lpnId
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log('Success:', JSON.stringify(res))
            this.setState({ success: true })
        })
        .catch(error => {
            console.error('Error:', error)
            this.setState({ fail: true })
        });
    }

    refreshPersonList() {
        this.props.closeEditPerson()
        this.setState({ 
            success: false,
            fail: false
        })
    }

    toggleFlagged() {
        let flaggedState = this.state.flagged;
        if (flaggedState === 0) {
            this.setState({ flagged: 1})
        } else {
            this.setState({ flagged: 0})
        }

    }

    render() {
        return(
            <div className="addModal">
                { this.state.success ? 
                    <div className="postNotification">
                        <div className="postNotificationContainer">
                            <p>Person Edit Successful!</p>
                            <button onClick={ () => this.refreshPersonList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Person Edit Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshPersonList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div>
                        <h1>Edit Person</h1>
                        <form onSubmit={ this.handleEditPerson }>

                        <label>Customer:</label>
                        { this.props.isMaster ? 
                        <select value={this.state.customerId} onChange={(e) => this.setState({ customerId: e.target.value})}>
                            {this.props.customers.map( customer => 
                                <option key={ customer.id } value={ customer.id }>{ customer.sName }</option>)
                            }  
                        </select> : <span>{ this.props.customerName }</span> }
                        <br/>

                        <label>Company</label>
                        <select value={this.state.companyId} onChange={(e) => this.setState({ companyId: e.target.value})}>
                            {this.props.companies.map( company => 
                                <option key={ company.id } value={ company.id }>{ company.sName }</option>)
                            }  
                        </select>
                        <br/>

                        <label>LPN:</label>
                        <select value={this.state.lpnId} onChange={(e) => this.setState({ lpnId: e.target.value})}>
                            {this.props.lpns.map( lpn => 
                                <option key={ lpn.id } value={ lpn.id }>{ lpn.sLPN }</option>)
                            }  
                        </select>
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

                        <label>Group:</label>
                        <select value={this.state.groupId} onChange={(e) => this.setState({ groupId: e.target.value})}>
                            {this.props.groups.map( group => 
                                <option key={ group.id } value={ group.id }>{ group.sName }</option>)
                            }  
                        </select>
                        <br/>

                        <label>Flagged:</label>
                        <input
                            type="checkbox"
                            name="flagged"
                            value={ this.state.flagged }
                            checked={ this.state.flagged }
                            onChange={ this.toggleFlagged } />
                        <br/>
                        <div className="addModalButtonContainer">
                            <button onClick={ () => this.props.closeEditPerson() }>Cancel</button>
                            <input type="submit" value="Save Person" />
                        </div>
                        </form>
                    </div> :
                    null 
                }
            </div>
        )
    }
}

export default EditPerson;
