import React from 'react';

class EditCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customerId: '',
            name: '',
            dir: '',
            domain: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleEditCustomer = this.handleEditCustomer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshCustomerList = this.refreshCustomerList.bind(this);
    }

    componentDidMount() {
        this.setState({
            customerId: this.props.rowData.id,
            name: this.props.rowData.sName,
            dir: this.props.rowData.sDir,
            domain: this.props.rowData.sDomain
        })
    }

    componentWillUnmount() {
        if(this.props.isMaster) {
            this.props.getAllCustomers();
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
            domain: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleEditCustomer(e) {
        e.preventDefault();

        fetch('/api/gatecustomerupdate/' + this.state.customerId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sName: this.state.name.trim(),
                sDir: this.state.dir.trim(),
                sDomain: this.state.domain.trim()
            })
        })
        .then(res => res.json())
        .then(res => {
            this.props.refreshTable();
            console.log('Success:', JSON.stringify(res))
            this.setState({
                success: true
            })
        })
        .catch(error => {
            console.error('Error:', error)
            this.setState({
                fail: true
            })
        });
    }

    refreshCustomerList() {
        this.props.closeEditCustomer()
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
                            <p>Customer Edit Successful!</p>
                            <button onClick={ () => this.refreshCustomerList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Customer Edit Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshCustomerList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div>
                        <h1>Edit Customer</h1>
                        <form onSubmit={ this.handleEditCustomer }>

                        <label>Customer Name:</label>
                        <input
                            type="text"
                            placeholder="enter name"
                            name="name"
                            value={ this.state.name }
                            onChange={ this.handleChange } />
                        <br/>

                        <label>Customer Directory:</label>
                        <span>base/ </span>
                        <input
                            type="text"
                            placeholder="enter directory"
                            name="dir"
                            value={ this.state.dir }
                            onChange={ this.handleChange } />
                        <span> /</span>
                        <br/>

                        <label>Customer Domain:</label>
                        <input
                            type="text"
                            placeholder="enter domain"
                            name="domain"
                            value={ this.state.domain }
                            onChange={ this.handleChange }/>
                            <span> .dividia.net</span>
                        <br/>
                        <div className="addModalButtonContainer">
                            <button onClick={ () => this.props.closeEditCustomer() }>Cancel</button>
                            <input type="submit" value="Save Customer" />
                        </div>
                
                        </form>
                    </div> :
                        null 
                    }
            </div>
        )
    }
}

export default EditCustomer;