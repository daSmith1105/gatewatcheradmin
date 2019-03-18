import React from 'react';
import '../App.css';


class EditEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventId: '',
            customerId: '', 
            userId: '', 
            lpnId: '',
            typeId: '', 
            gateId: '',
            companyId: '', 
            personId: '',
            text: '',
            passengers: null,
            modifiedComment: '',
            waiting: false,
            success: false,
            fail: false,
        }

        this.handleEditEvent= this.handleEditEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.refreshEventList = this.refreshEventList.bind(this);
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllEvents();
        }
        if(this.props.isAdmin) {
            this.props.getAllEventsByCustomer();
        }
    }

    componentDidMount() {
        this.setState({
            eventId: this.props.rowData.id,
            customerId: this.props.rowData.bCustomerID,
            userId: this.props.rowData.bUserID,
            lpnId: this.props.rowData.bLpnID,
            typeId: this.props.rowData.bTypeID, 
            gateId: this.props.rowData.bGateID,
            companyId: this.props.rowData.bCompanyID,
            personId: this.props.rowData.bPersonID,
            text: this.props.rowData.sComment,
            passengers: this.props.rowData.aPassengers,
        })
    }

    handleChange(e) {
       let name = e.target.name;
       let value = e.target.value;
       this.setState({ 
           [name]: value,
        }) 
    }

  handleEditEvent(e) {
        e.preventDefault();
        fetch('/api/gateeventupdate/1', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    bUserID: this.state.userId,
                    bTypeID: this.state.typeId,
                    bCompanyID: this.state.companyId,
                    bCustomerID: this.state.customerId,
                    bPersonID: this.state.personId,
                    bGateID: this.state.gateId,
                    aPassengers: 1,
                    bLpnID: this.state.lpnId,
                    sComment: this.state.text.trim(),
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log('Success:', JSON.stringify(res));
            this.setState({ success: true })
        })
        .catch(error => console.error('Error:', error));
    }

    refreshEventList() {
        this.props.closeEditEvent()
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
                            <p>Event Edit Successful!</p>
                            <button onClick={ () => this.refreshEventList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Event Edit Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshEventList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div>
                        <h1>Edit Event</h1>
                        <form onSubmit={ this.handleEditEvent }> 

                        <label>Customer:</label>
                        { this.props.isMaster ? 
                        <select value={this.state.customerId} onChange={(e) => this.setState({ customerId: e.target.value})}>
                            {this.props.customers.map( customer => 
                                <option key={ customer.id } value={ customer.id }>{ customer.sName }</option>)
                            }  
                        </select> : <span>{ this.props.customerName }</span> } 
                        <br />

                        <label>Company</label>
                        <select value={this.state.companyId} onChange={(e) => this.setState({ companyId: e.target.value})}>
                            {this.props.companies.map( company => 
                                <option key={ company.id } value={ company.id }>{ company.sName }</option>)
                            }  
                        </select>
                        <br/>

                        <label>Type:</label>
                        <select value={this.state.typeId} onChange={(e) => this.setState({ typeId: e.target.value})}>
                            {this.props.eventTypes.map( type => 
                                <option key={ type.id } value={ type.id }>{ type.sName }</option>)
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

                        <label>LPN</label>
                        <select value={this.state.lpnId} onChange={(e) => this.setState({ lpnId: e.target.value})}>
                            {this.props.lpns.map( lpn => 
                                <option key={ lpn.id } value={ lpn.id }>{ lpn.sLPN }</option>)
                            }  
                        </select>
                        <br/>
                        
                        <label>Person</label>
                        <select value={this.state.personId} onChange={(e) => this.setState({ personId: e.target.value})}>
                            {this.props.people.map( person => 
                                <option key={ person.id } value={ person.id }>{ person.sFirstName + ' ' + person.sLastName }</option>)
                            }  
                        </select>
                        <br/>
                        
                        <label>Group:</label>
                        <select value={this.state.groupId} onChange={(e) => this.setState({ groupId: e.target.value})}>
                            {this.props.groups.map( group => 
                                <option key={ group.id } value={ group.id }>{ group.sName }</option>)
                            }  
                        </select>
                        <br/><br/>

                        <label style={{verticalAlign: 'top'}}>Comments:</label>
                        <textarea  
                                value={ this.state.text } 
                                onChange={ (e) => {
                                    e.preventDefault()
                                    this.setState({ text: e.target.value.trim() }) 
                                }} 
                                name="text" />
                        <br/>    

                        <label>Logged By:</label>
                        <select value={this.state.userId} onChange={(e) => this.setState({ userId: e.target.value})}>
                            {this.props.users.map( user => 
                                <option key={ user.id } value={ user.id }>{ user.sFirstName + ' ' + user.sLastName + ' - ' + user.GateAcl.sName }</option>)
                            }  
                        </select>
                        <br/>
                        <div className="addModalButtonContainer">
                            <button onClick={ () => this.props.closeEditEvent() }>Cancel</button>
                            <input type="submit" value="Save Event" />
                        </div>
                        </form>
                        <br/>
                    </div> :
                    null
                }
          </div>
        )
    }
}

export default EditEvent;