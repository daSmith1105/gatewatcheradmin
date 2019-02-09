import React from 'react';

class AddCustomer extends React.Component {
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
                sDir: 'base/' + this.state.dir.trim() + '/',
                sDomain: this.state.domain.trim() + '.dividia.net'
            })
        })
        .then(res => res.json())
        .then(res => console.log('Success:', JSON.stringify(res)))
        .catch(error => console.error('Error:', error));

        this.props.updateCustomerTable()
    }

    render() {
        return(
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

                <input type="submit" value="Add Customer" />
        
                </form>
            </div>
        )
    }
}

export default AddCustomer;
