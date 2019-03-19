import React from 'react';

class AddLPN extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lpn: '',
            customerId: '',
            companyId: '',
            flagged: 0,
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleAddLPN = this.handleAddLPN.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshLpnList = this.refreshLpnList.bind(this);
        this.toggleFlagged = this.toggleFlagged.bind(this);
    }

    componentDidMount() {
        if(this.props.isAdmin){
            this.setState({ customerId: this.props.customers.id })
        } else {
            this.setState({
                customerId: this.props.customers[0].id,
        })
        this.setState({
            companyId: this.props.companies[0].id,
            flagged: 0,
        })
        }
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllLpns();
        }
        if(this.props.isAdmin) {
            this.props.getAllLpnsByCustomer();
        }
    }

    handleChange(e) {
       let target = e.target.name;
       let value = e.target.value;
       this.setState({ [target]: value })
    }

    handleClear() {
        this.setState({
            lpn: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleAddLPN(e) {
        e.preventDefault();

        fetch('/api/gatelpn/' + this.state.customerId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sLPN: this.state.lpn.trim(),
                bCompanyID: this.state.companyId,
                fFlagged: this.state.flagged
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

    refreshLpnList() {
        this.props.closeAddLpn()
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
                            <p>LPN Add Successful!</p>
                            <button onClick={ () => this.refreshLpnList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>LPN Add Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshLpnList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div>
                        <h1>Add LPN</h1>
                        <form onSubmit={ this.handleAddLPN }>

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

                        <label>License Plate Number:</label>
                        <input
                            type="text"
                            placeholder="enter lpn"
                            name="lpn"
                            value={ this.state.lpn }
                            onChange={ this.handleChange }
                            required />
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
                            <button onClick={ () => this.props.closeAddLpn() }>Cancel</button>
                            <input type="submit" value="Add License Plate Number" />
                        </div>
                        </form>
                        
                    </div> :
                    null 
                }
            </div>
        )
    }
}

export default AddLPN;
