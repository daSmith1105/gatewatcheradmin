import React from 'react';

class AddGate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            dir: '',
            reportErrors: true,
            customerId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleAddGate = this.handleAddGate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshGateList = this.refreshGateList.bind(this);
    }

    componentDidMount() {
        if(this.props.isAdmin){
            this.setState({ customerId: this.props.customers.id })
        } else {
            this.setState({
                customerId: this.props.customers[0].id,
        })
        }
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllGates();
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
            name: '',
            dir: '',
            reportErrors: false,
            customerId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleAddGate(e) {
        e.preventDefault();

        fetch('/api/gate/' + this.state.customerId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sName: this.state.name.trim(),
                sDir: this.state.dir.trim(),
                fReportErrors: this.state.reportErrors
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
        this.props.closeAddGate()
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
                            <p>Gate Add Successful!</p>
                            <button onClick={ () => this.refreshGateList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Gate Add Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshGateList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div>
                        <h1>Add Gate:</h1>
                        <form onSubmit={ this.handleAddGate }>

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
                            value={ this.state.name}
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
                            <button onClick={ () => this.props.closeAddGate() }>Cancel</button>
                            <input type="submit" value="Add Gate" />
                        </div>
                        </form>
                        
                    </div> :
                    null
                }
            </div>
        )
    }
}

export default AddGate;
