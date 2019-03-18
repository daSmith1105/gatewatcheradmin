import React from 'react';

class EditGate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gateId: '',
            name: '',
            dir: '',
            reportErrors: 1,
            customerId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleEditGate = this.handleEditGate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshGateList = this.refreshGateList.bind(this);
    }

    componentDidMount() {
        this.setState({
            gateId: this.props.rowData.id,
            name: this.props.rowData.sName,
            dir: this.props.rowData.sDir,
            reportErrors: this.props.rowData.fReportErrors,
            customerId: this.props.rowData.GateCustomer.id,
        })
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllGates()
        }
        if(this.props.isAdmin) {
            this.props.getAllGatesByCustomer();
        }
    }

    handleChange(e) {
       let target = e.target.name;
       let value = e.target.value;
       this.setState({ [target]: value })
    }

    handleClear() {
        this.setState({
            gateId: '',
            name: '',
            dir: '',
            reportErrors: 1,
            customerId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleEditGate(e) {
        e.preventDefault();
        fetch('/api/gateupdate/' + this.state.gateId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sName: this.state.name.trim(),
                sDir: this.state.dir.trim(),
                fReportErrors: this.state.reportErrors,
                bCustomerId: this.state.customerId
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

    refreshGateList() {
        this.props.closeEditGate()
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
                            <p>Gate Edit Successful!</p>
                            <button onClick={ () => this.refreshGateList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Gate Edit Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshGateList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div>
                        <h1>Edit Gate:</h1>
                        <form onSubmit={ this.handleEditGate }>

                        <label>Customer:</label>
                        { this.props.isMaster ? 
                        <select value={this.state.customerId} onChange={(e) => this.setState({ customerId: e.target.value})}>
                            {this.props.customers.map( customer => 
                                <option key={ customer.id } value={ customer.id }>{ customer.sName }</option>)
                            }  
                        </select> : <span>{ this.props.customerName }</span> }
                        <br/>

                        <label>Gate Name:</label>
                        <input
                            type="text"
                            placeholder="enter gate name"
                            name="name"
                            value={ this.state.name }
                            onChange={ this.handleChange }
                            required />
                        <br/>

                        <label>Gate Directory: </label>
                        <span> base/ </span>
                        <input
                            type="text"
                            placeholder="enter gate directory"
                            name="dir"
                            value={ this.state.dir }
                            onChange={ this.handleChange }
                            required />
                            <span> /</span>
                        <br/>

                        <label>Report Errors:</label>
                        <input
                            type="checkbox"
                            name="reportErrors"
                            checked={this.state.reportErrors}
                            onChange={ () => this.setState({ reportErrors: !this.state.reportErrors}) } />
                        <br/>
                        <div className="addModalButtonContainer">
                            <button onClick={ () => this.props.closeEditGate() }>Cancel</button>
                            <input type="submit" value="Save Gate" />
                        </div>
                        </form>
                    </div> :
                    null
                }
            </div>
        )
    }
}

export default EditGate;
