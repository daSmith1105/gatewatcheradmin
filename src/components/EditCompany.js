import React from 'react';

class EditCompany extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            companyId: '',
            name: '',
            flagged: '',
            customerId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false
        }

        this.handleEditCompany = this.handleEditCompany.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshCompanyList = this.refreshCompanyList.bind(this);
        this.toggleFlagged = this.toggleFlagged.bind(this);
    }

    componentDidMount() {
        this.setState({
            companyId: this.props.rowData.id,
            name: this.props.rowData.sName,
            flagged: this.props.rowData.fFlagged,
            customerId: this.props.rowData.GateCustomer.id
        })
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllCompanies();
        }
        if(this.props.isAdmin) {
            this.props.getAllCompaniesByCustomer();
        }
    }

    handleChange(e) {
       let target = e.target.name;
       let value = e.target.value;
       this.setState({ [target]: value })
    }

    handleClear() {
        this.setState({
            companyId: '',
            name: '',
            flagged: 0,
            customerId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false
        })
    }

  handleEditCompany(e) {
        e.preventDefault();

        fetch('/api/gatecompanyupdate/' + this.state.companyId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sName: this.state.name.trim(),
                fFlagged: this.state.flagged,
                bCustomerID: this.state.customerId
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log('Success:', JSON.stringify(res))
            this.props.refreshTable();
            this.setState({ success: true })
        })
        .catch(error => {
            console.error('Error:', error)
            this.setState({ fail: true })
        });
        
    }

    refreshCompanyList() {
        this.props.closeEditCompany()
        this.setState({ 
            success: false,
            fail: false
        })
    }

    toggleFlagged() {
        let flaggedState = this.state.flagged;
        if (flaggedState === 0) {
            this.setState({ flagged: 1} )
        } else {
            this.setState({ flagged: 0} )
        }

    }

    render() {
        return(
            <div className="addModal">
                { this.state.success ? 
                    <div className="postNotification">
                        <div className="postNotificationContainer">
                            <p>Company Edit Successful!</p>
                            <button onClick={ () => this.refreshCompanyList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Company Edit Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshCompanyList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div>
                        <h1>Edit Company:</h1>
                        <form onSubmit={ this.handleEditCompany }>
                        
                        <label>Customer:</label>
                        { this.props.isMaster ? 
                        <select value={this.state.customerId} onChange={(e) => this.setState({ customerId: e.target.value})}>
                            {this.props.customers.map( customer => 
                                <option key={ customer.id } value={ customer.id }>{ customer.sName }</option>)
                            }  
                        </select> : <span>{ this.props.customerName }</span> }
                        <br/>

                        <label>Company Name:</label>
                        <input
                            type="text"
                            placeholder="enter name"
                            name="name"
                            value={ this.state.name }
                            onChange={ this.handleChange } />
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
                            <button onClick={ () => this.props.closeEditCompany() }>Cancel</button>
                            <input type="submit" value="Save Company" />
                        </div>
                        </form>
                    </div> :
                    null 
                }
                </div>
            )
    }
}

export default EditCompany;