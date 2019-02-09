import React from 'react';

class AddLPN extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            driverId: '',
            lpn: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        }
        this.handleAddLPN = this.handleAddLPN.bind(this);
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
            driverId: '',
            lpn: '',
            submitted: false,
            waiting: false,
            success: false,
            fail: false,
        })
    }

  handleAddLPN(e) {
        e.preventDefault();

        fetch('/api/gatelpn/' + this.state.driverId, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sLPN: this.state.lpn.trim(),
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
                <h1>Add LPN</h1>
                <form onSubmit={ this.handleAddLPN }>

                <label>Driver ID:</label>
                <input
                    type="text"
                    placeholder="enter driver id"
                    name="driverId"
                    value={ this.state.driverId }
                    onChange={ this.handleChange }
                    required />
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

                <input type="submit" value="Add License Plate Number" />
                </form>
            </div>
        )
    }
}

export default AddLPN;
