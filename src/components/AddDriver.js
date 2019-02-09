import React from 'react';

class AddDriver extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            companyId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleAddDriver = this.handleAddDriver.bind(this);
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
            firstName: '',
            lastName: '',
            companyId: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleAddDriver(e) {
        e.preventDefault();

        fetch('/api/gatedriver/' + this.state.companyId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sFirstName: this.state.firstName.trim(),
                sLastName: this.state.lastName.trim(),
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
                <h1>Add Driver</h1>
                <form onSubmit={ this.handleAddDriver }>

                <label>Company ID:</label>
                <input
                    type="text"
                    placeholder="enter company id"
                    name="companyId"
                    value={ this.state.companyId }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>First Name:</label>
                <input
                    type="text"
                    placeholder="enter first name"
                    name="firstName"
                    value={ this.state.firstName }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <label>Last Name:</label>
                <input
                    type="text"
                    placeholder="enter last name"
                    name="lastName"
                    value={ this.state.lastName }
                    onChange={ this.handleChange }
                    required />
                <br/>

                <input type="submit" value="Add Driver" />
                </form>
            </div>
        )
    }
}

export default AddDriver;
