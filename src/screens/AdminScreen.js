import React from 'react';
import AddCustomer from '../components/AddCustomer';
import ViewCustomers from '../components/ViewCustomers';
import AddUser from '../components/AddUser';
import AddCompany from '../components/AddCompany';
import AddDriver from '../components/AddDriver';
import AddLPN from '../components/AddLPN';

class AdminScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshCustomerTable: false
        }
        this.updateCustomerTable = this.updateCustomerTable.bind(this);
    }

    updateCustomerTable() {
        this.setState({ refreshCustomerTable: !this.state.refreshCustomerTable })
    }

    render() {
        return(
            <div>
                <div style={ styles.container }>
                    <ViewCustomers refreshCustomerTable={ this.state.refreshCustomerTable } 
                                updateCustomerTable={ this.updateCustomerTable }/>
                    <AddCustomer updateCustomerTable={ this.updateCustomerTable } />
                </div>
                <div style={ styles.container }>
                    <AddUser updateCustomerTable={ this.updateCustomerTable } />
                </div>
                <div style={ styles.container }>
                    <AddCompany updateCustomerTable={ this.updateCustomerTable } />
                </div>
                <div style={ styles.container }>
                    <AddDriver updateCustomerTable={ this.updateCustomerTable } />
                </div>
                <div style={ styles.container }>
                    <AddLPN updateCustomerTable={ this.updateCustomerTable } />
                </div>
            </div>
        )
    }
}

export default AdminScreen;

const styles = {
    container: {
        border: '4px solid lightgrey',
        borderRadius: 10,
        padding: 20
    }
}