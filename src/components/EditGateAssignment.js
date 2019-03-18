import React from 'react';

class EditGateAssignment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assignmentId: '',
            gateId: '',
            customerId: '',
            userId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleEditGateAssignment = this.handleEditGateAssignment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshGateAssingmentList = this.refreshGateAssignmentList.bind(this);
    }

    componentDidMount() {
        this.setState({
            assignmentId: this.props.rowData.id,
            gateId: this.props.rowData.Gate.id,
            customerId: this.props.rowData.GateCustomer.id,
            userId: this.props.rowData.GateUser.id,
        })
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllGateAssignments();
        }
        if(this.props.isAdmin) {
            this.props.getAllGateAssignmentsByCustomer();
        }
    }

    handleChange(e) {
       let target = e.target.name;
       let value = e.target.value;
       this.setState({ [target]: value })
    }

    handleClear() {
        this.setState({
            assignmentId: '',
            gateId: '',
            customerId: '',
            userId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleEditGateAssignment(e) {
        e.preventDefault();
        fetch('/api/gateassignmentupdate/' + this.state.assignmentId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bGateID: this.state.gateId,
                bUserID: this.state.userId,
                bCustomerID: this.state.customerId
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

    refreshGateAssignmentList() {
        this.props.closeEditGateAssignment()
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
                            <p>Gate Assignment EditSuccessful!</p>
                            <button onClick={ () => this.refreshGateAssignmentList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Gate Assignment Edit Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshGateAssignmentList() }>OK</button>
                    </div> :
                    null
                }

                { (!this.state.success || !this.state.fail) && this.props.guards.length > 0 ?
                    <div>
                        <h1>Edit Guard Assignment</h1>
                        <form onSubmit={ this.handleEditGateAssignment }>

                        <label>Guard:</label>
                        <select value={this.state.userId} onChange={(e) => this.setState({ userId: e.target.value})}>
                            {this.props.guards.map( user => 
                                <option key={ user.id } value={ user.id }>{ user.sFirstName + ' ' + user.sLastName }</option>)
                            }  
                        </select>
                        <br/>

                        <label>Customer:</label>
                        <select value={this.state.customerId} onChange={(e) => this.setState({ customerId: e.target.value})}>
                            {this.props.customers.map( customer => 
                                <option key={ customer.id } value={ customer.id }>{ customer.sName }</option>)
                            }  
                        </select>
                        <br />

                        <label>Gate</label>
                        <select value={this.state.gateId} onChange={(e) => this.setState({ gateId: e.target.value})}>
                            {this.props.gates.map( gate => 
                                <option key={ gate.id } value={ gate.id }>{ gate.sName }</option>)
                            }  
                        </select>
                        <br/>
                        
                        <br/>
                        <div className="addModalButtonContainer">
                            <button onClick={ () => this.props.closeEditGateAssignment() }>Cancel</button>
                            <input type="submit" value="Save Guard Assignment" />
                        </div>
                        </form>
                    </div> :
                    null
                }
            </div>
        )
    }
}

export default EditGateAssignment;