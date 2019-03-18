import React from 'react';
import '../App.css';


class AddEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customerId: '', 
            userId: '', 
            lpnId: '',
            typeId: '', 
            gateId: '',
            companyId: '', 
            personId: '',
            text: '',
            lpnPhoto: '',
            loadPhoto: '',
            waiting: false,
            success: false,
            fail: false,
            newLPN: '',
            newLPNFound: false,
            renderLPN: false,
        }

        this.handleAddEvent= this.handleAddEvent.bind(this);
        this.routePost = this.routePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeLPN = this.handleChangeLPN.bind(this);
        this.handleChangeCompany = this.handleChangeCompany.bind(this);
        this.handleChangeGate = this.handleChangeGate.bind(this);
        this.handleChangeType = this.handleChangeType;
        this.handleChangeDriver = this.handleChangeDriver.bind(this);
        this.getCompany = this.getCompany.bind(this);
        this.getLPN = this.getLPN.bind(this);
        this.toggleAddLPN = this.toggleAddLPN.bind(this);
        this.checkCompanies = this.checkCompanies.bind(this);
        this.resetFormNewLPN = this.resetFormNewLPN.bind(this);
        this.refreshEventList = this.refreshEventList.bind(this);
    }

    componentDidMount() {
        if (this.props.isMaster) {
            this.setState({
                companyId: this.props.companies[0].id,
                customerId: this.props.customers[0].id,
                lpnId: this.props.lpns[0].id,
                groupId: this.props.groups[0].id,
                userId: this.props.users[0].id,
                typeId: this.props.eventTypes[0].id,
                gateId: this.props.gates[0].id,
                personId: this.props.people[0].id,
            })
        }
        if (this.props.isAdmin) {
            this.setState({
                companyId: this.props.companies[0].id,
                customerId: this.props.customers.id,
                lpnId: this.props.lpns[0].id,
                groupId: this.props.groups[0].id,
                userId: this.props.users[0].id,
                typeId: this.props.eventTypes[0].id,
                gateId: this.props.gates[0].id,
                personId: this.props.people[0].id,
            })
        }
        if (this.props.isGuard) {
            this.setState({
                companyId: this.props.companies[0].id,
                customerId: this.props.customers.id,
                lpnId: this.props.lpns[0].id,
                groupId: this.props.groups[0].id,
                userId: this.props.userId,
                typeId: this.props.eventTypes[0].id,
                gateId: this.props.assignedGate,
                personId: this.props.people[0].id,
            })
        }
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllEvents();
        }
        if(this.props.isAdmin) {
            this.props.getAllEventsByCustomer();
        }
        if(this.props.isGuard) {
            this.props.getAllEventsByGate();
        }
    }

    toggleAddLPN(e) {
        e.preventDefault();
        console.log( 'addLPN toggled - state > ' + this.state.renderAddLPN );
        console.log(this.state.companies)
        this.setState({ renderAddLPN: !this.state.renderLPN })
    }

    getLPN() { 
        fetch('/api/gatelpnbyid/' + this.state.lpnId)
        .then( response => response.json())
        .then(data => {
            this.setState({ 
                companyId: data.bCompanyID,
                driverId: data.bDriverID
            }, () => {
                this.getCompany()
            })
        })
    }
    
    getCompany() {
        fetch('/api/gatecompanybyid/' + this.state.companyId)
        .then( response => response.json())
        .then(data => {
            this.setState({ 
                companyId: { value: data.id, label: data.sName },
            }, () => {
                fetch('/api/gatedriverbyid/' + this.state.driverId)
                .then( response => response.json())
                .then(data => {
                    this.setState({ 
                        driverId: { value: data.id, label: data.sFirstName + ' ' + data.sLastName }
                    }, console.log(this.state.driverId))

                })
            })
        })
    }

    handleChange(e) {
       let name = e.target.name;
       let value = e.target.value;
       console.log(name + ' : ' + value)
       this.setState({ 
           [name]: value,
        }) 
    }

    handleChangeLPN(option) {
        if( option.__isNew__ === true) {
            this.setState({
                newLPNFound: true,
                newLPN: option.label
             }, console.log(this.state.companies))
        } else {
            this.setState({ 
                newLPNFound: false,
                lpnId: option.value ,
                newLPN: ''
            }, () => { 
                console.log(this.state.lpnId);
                this.getLPN() })
     }
    }

    handleChangeGate(option) {
            this.setState({ 
                gateId: option.value,
            }, () => console.log(this.state.gateId))
    }

    handleChangeType(option) {
            this.setState({ 
                typeId: option.value,
            }, () => console.log(this.state.typeId))
    }

    handleChangeDriver(option) {
        if (option.value === 'SELECT DRIVER'){
            console.log('Not gonnna do it')
        } else {
        this.setState({ 
            driverId: option.value,
        }, () => console.log(this.state.driverId))
    }
}

    handleChangeCompany(option) {
        if (option.value === 'SELECT COMPANY'){
            console.log('Not gonnna do it')
        } else {
        this.setState({ 
            companyId: option.value,
        },
        () => {
            fetch('/api/gatedriversbycompany/' + this.state.companyId)
            .then( response => response.json())
                .then(data => {
                    console.log(data)
                    if(this.state.newLPNFound) {
                        this.setState({ 
                            drivers: data,
                            driverId: { value: data[0].id, label: data[0].sFirstName + ' ' + data[0].sLastName }
                        })
                    } else {
                        this.setState({ 
                            drivers: data,
                        })
                    }
                })
            })
        }
            
    }

  handleAddEvent(e) {
        e.preventDefault();
        fetch('/api/gateevent/' + this.state.customerId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bUserID: this.state.userId,
                bTypeID: this.state.typeId,
                bCompanyID: this.state.companyId,
                bPersonID: this.state.personId,
                bGateID: this.state.gateId,
                bLpnID: this.state.lpnId,
                sLpnPhoto: this.state.lpnPhoto.trim(),
                sLoadPhoto: this.state.loadPhoto.trim(),
                sComment: this.state.text.trim()
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log('Success:', JSON.stringify(res));
            this.setState({ success: true })
        })
        .catch(error => console.error('Error:', error));
        // this.setState({ fail: true })
    }


    checkCompanies(e) {
        e.preventDefault();
        console.log(JSON.stringify(this.state.drivers))
    }

    routePost(e) {
        e.preventDefault();
        // this.setState({ newLPNFound: false })
        // if(this.state.newLPNFound) {
        //     this.handlePostNewLPN()
        // } else {
        //     this.resetForm()
            this.handleAddEvent(e)
        // }
    }

    resetFormNewLPN() {
        this.setState({
            typeId: {value: null, label: null},
            gateId: {value: null, label: null},
            lpnId: {value: null, label: null},
            lpnPhoto: '',
            loadPhoto: '',
            waiting: false,
            success: false,
            fail: false,
            newLPN: '',
        })
    }

    refreshEventList() {
        this.props.closeAddEvent()
        this.setState({ 
            success: false,
            fail: false
        })
    }


    render() {
        console.log(this.props);
        return(
            <div className="addModal">

                { this.state.success ? 
                    <div className="postNotification">
                        <div className="postNotificationContainer">
                            <p>Event Add Successful!</p>
                            <button onClick={ () => this.refreshEventList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Event Add Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshEventList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div style={{marginTop: '-20px'}}>
                        <h1>Add Event</h1>
                        <form onSubmit={ this.handleAddEvent }> 

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
                        { this.props.isGuard ? 
                            <span>{ this.props.assignedGateName }</span> :
                            <select value={this.state.gateId} onChange={(e) => this.setState({ gateId: e.target.value})}>
                                {this.props.gates.map( gate => 
                                    <option key={ gate.id } value={ gate.id }>{ gate.sName }</option>)
                                }  
                            </select>
                        }
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
                        <br/><br />

                        <label style={{ verticalAlign: 'top' }}>Comments:</label>
                        <textarea value={this.state.value} onChange={this.handleChange} name="text" />
                        <br/>    


                        <label>LPN Photo:</label>
                        <input
                            type="file"
                            name="lpnPhoto"
                            required={true}
                            value={ this.state.lpnPhoto }
                            onChange={ this.handleChange }
                            />
                        <br/>


                        <label>Load Photo:</label>
                        <input
                            type="file"
                            name="loadPhoto"
                            required={true}
                            value={ this.state.loadPhoto }
                            onChange={ this.handleChange }
                            />
                        <br/>
                        
                        <label>Logged By:</label>
                        { this.props.isGuard ? 
                            <span>{ this.props.fullName }</span> :
                            <select value={this.state.userId} onChange={(e) => this.setState({ userId: e.target.value})}>
                                {this.props.users.map( user => 
                                    <option key={ user.id } value={ user.id }>{ user.sFirstName + ' ' + user.sLastName + ' - ' + user.GateAcl.sName }</option>)
                                }  
                            </select>
                        }
                        <br/>
                        <div className="addModalButtonContainer">
                            <button onClick={ () => this.props.closeAddEvent() }>Cancel</button>
                            <input type="submit" value="Add Event" />
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

export default AddEvent;
