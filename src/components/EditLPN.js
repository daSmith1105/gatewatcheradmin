import React from 'react';

class EditLPN extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lpn: '',
            customerId: '',
            companyId: '',
            lpnId: '',
            flagged: 0,
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleEditLPN = this.handleEditLPN.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshLpnList = this.refreshLpnList.bind(this);
        this.toggleFlagged = this.toggleFlagged.bind(this);
    }
    
    componentDidMount() {
        this.setState({
            lpn: this.props.rowData.sLPN,
            customerId: this.props.rowData.GateCustomer.id,
            companyId: this.props.rowData.GateCompany.id,
            lpnId: this.props.rowData.id,
            flagged: this.props.rowData.fFlagged,
        })
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
            customerId: '',
            companyId: '',
            lpnId: '',
            flagged: 0,
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleEditLPN(e) {
        e.preventDefault();

        fetch('/api/gatelpnupdate/' + this.state.lpnId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sLPN: this.state.lpn.trim(),
                bCompanyID: this.state.companyId,
                bCustomerId: this.state.customerId,
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
        this.props.closeEditLpn()
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
                            <p>LPN Edit Successful!</p>
                            <button onClick={ () => this.refreshLpnList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>LPN Edit Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshLpnList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div>
                        <h1>Edit LPN</h1>
                        <form onSubmit={ this.handleEditLPN }>

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
                            <button onClick={ () => this.props.closeEditLpn() }>Cancel</button>
                            <input type="submit" value="Save License Plate Number" />
                        </div>
                        </form>
                    </div> :
                    null 
                }
            </div>
        )
    }
}

export default EditLPN;
