import React from 'react';

class AddGateAssignment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gateId: '',
            customerId: '',
            guardId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleAddGateAssignment = this.handleAddGateAssignment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshGateAssingmentList = this.refreshGateAssignmentList.bind(this);
    }

    componentDidMount() {
        if(this.props.isAdmin){
            this.setState({ customerId: this.props.customers.id })
        }
        this.setState({
            gateId: this.props.gates[0].id,
            guardId: this.props.guards[0].id,
            customerId: this.props.customers[0].id
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
            gateId: '1',
            customerId: '1',
            guardId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleAddGateAssignment(e) {
        e.preventDefault();

        fetch('/api/gateassignment/' + this.state.customerId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bGateID: this.state.gateId,
                bUserID: this.state.guardId,
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
        this.props.closeAddGateAssignment()
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
                            <p>Gate Assignment Add Successful!</p>
                            <button onClick={ () => this.refreshGateAssignmentList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Gate Assignment Add Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshGateAssignmentList() }>OK</button>
                    </div> :
                    null
                }

                { (!this.state.success || !this.state.fail) && this.props.guards.length > 0 ?
                    <div>
                        <h1>Add Guard Assignment</h1>
                        <form onSubmit={ this.handleAddGateAssignment }>

                        <label>Guard:</label>
                        <select value={this.state.guardId} onChange={(e) => this.setState({ guardId: e.target.value})}>
                            {this.props.guards.map( guard => 
                                <option key={ guard.id } value={ guard.id }>{ guard.sFirstName + ' ' + guard.sLastName }</option>)
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
                            <button onClick={ () => this.props.closeAddGateAssignment() }>Cancel</button>
                            <input type="submit" value="Add Guard Assignment" />
                        </div>
                        </form>
                    </div> :
                    null
                }
            </div>
        )
    }
}

export default AddGateAssignment;
