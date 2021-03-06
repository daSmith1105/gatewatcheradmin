import React from 'react';

class EditCustomer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            dir: '',
            domain: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleAddCustomer = this.handleAddCustomer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.refreshCustomerList = this.refreshCustomerList.bind(this);
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

  handleAddCustomer(e) {
        e.preventDefault();

        fetch('/api/gatecustomer', {
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
        this.props.closeAddCustomer()
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
                            <p>Customer Add Successful!</p>
                            <button onClick={ () => this.refreshCustomerList() }>OK</button>
                        </div>
                    </div> :
                    null
                }

                { this.state.fail ? 
                    <div className="postNotification">
                        <p>Customer Add Failed!</p>
                        <p>If the problem continues please contact your installer.</p>
                        <button onClick={ () => this.refreshCustomerList() }>OK</button>
                    </div> :
                    null
                }

                { !this.state.success || !this.state.fail ?
                    <div>
                        <h1>Add Customer</h1>
                        <form onSubmit={ this.handleAddCustomer }>

                        <label>Customer Name:</label>
                        <input
                            type="text"
                            placeholder="enter name"
                            name="name"
                            value={ this.state.name }
                            onChange={ this.handleChange }
                            required />
                        <br/>

                        <label>Customer Directory:</label>
                        <span>base/ </span>
                        <input
                            type="text"
                            placeholder="enter directory"
                            name="dir"
                            value={ this.state.dir }
                            onChange={ this.handleChange } 
                            required />
                        <span> /</span>
                        <br/>

                        <label>Customer Domain:</label>
                        <input
                            type="text"
                            placeholder="enter domain"
                            name="domain"
                            value={ this.state.domain }
                            onChange={ this.handleChange }
                            required />
                            <span> .dividia.net</span>
                        <br/>
                        <div className="addModalButtonContainer">
                            <button onClick={ () => this.props.closeAddCustomer() }>Cancel</button>
                            <input type="submit" value="Add Customer" />
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
