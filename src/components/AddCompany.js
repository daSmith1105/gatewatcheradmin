import React from 'react';

class AddCompany extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            street: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            phone: '',
            email: '',
            contactFirstName: '',
            contactLastName: '',
            customerId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }

        this.handleAddCompany = this.handleAddCompany.bind(this);
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
            street: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            phone: '',
            email: '',
            contactFirstName: '',
            contactLastName: '',
            customerId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleAddCompany(e) {
        e.preventDefault();

        fetch('/api/gatecompany/' + this.state.customerId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sName: this.state.name.trim(),
                sStreet: this.state.street.trim(),
                sStreet2: this.state.street2.trim(),
                sCity: this.state.city.trim(),
                sState: this.state.state.trim(),
                sCountry: this.state.country.trim(),
                sPhone: this.state.phone.trim(),
                sEmail: this.state.email.trim(),
                sContactFirstName: this.state.contactFirstName.trim(),
                sContactLastName: this.state.contactLastName.trim(),
            })
        })
        .then(res => res.json())
        .then(res => console.log('Success:', JSON.stringify(res)))
        .catch(error => console.error('Error:', error));
        
        this.props.updateCustomerTable();
    }

    render() {
        return(
            <div>
                <h1>Add Company:</h1>
                <form onSubmit={ this.handleAddCompany }>
                
                <label>Customer ID:</label>
                <input
                    type="text"
                    placeholder="enter custoemr Id"
                    name="customerId"
                    value={ this.state.customerId }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>Company Name:</label>
                <input
                    type="text"
                    placeholder="enter name"
                    name="name"
                    value={ this.state.name }
                    onChange={ this.handleChange } />
                <br/>

                <label>Customer Address</label>
                <br/>
                <label>Street:</label>
                <input
                    type="text"
                    placeholder="enter street"
                    name="street"
                    value={ this.state.street }
                    onChange={ this.handleChange } />
                <br/>
                <label>Street 2:</label>
                <input
                    type="text"
                    placeholder="enter street 2 (optional)"
                    name="street2"
                    value={ this.state.street2 }
                    onChange={ this.handleChange } />
                <br/>

                <label>City:</label>
                <input
                    type="text"
                    placeholder="enter city"
                    name="city"
                    value={ this.state.city }
                    onChange={ this.handleChange } />
                <br/>

                <label>State:</label>
                <input
                    type="text"
                    placeholder="enter state"
                    name="state"
                    value={ this.state.state }
                    onChange={ this.handleChange } />
                <br/>

                <label>Country:</label>
                <input
                    type="text"
                    placeholder="enter country"
                    name="country"
                    value={ this.state.country }
                    onChange={ this.handleChange } />
                <br/>

                <label>Phone:</label>
                <input
                    type="phone"
                    placeholder="enter phone"
                    name="phone"
                    value={ this.state.phone }
                    onChange={ this.handleChange } />
                <br/>

                <label>Email:</label>
                <input
                    type="email"
                    placeholder="enter email"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.handleChange } />
                <br/>

                <label>Primary Contact:</label>
                <br/>
                <label>First Name:</label>
                <input
                    type="text"
                    placeholder="enter first name"
                    name="contactFirstName"
                    value={ this.state.contactFirstname }
                    onChange={ this.handleChange } />
                <br/>
                <label>Last Name:</label>
                <input
                    type="text"
                    placeholder="enter first name"
                    name="contactFirstName"
                    value={ this.state.contactFirstname }
                    onChange={ this.handleChange } />
                <br/>

                <input type="submit" value="Add Company" />
        
                </form>
            </div>
        )
    }
}

export default AddCompany;
