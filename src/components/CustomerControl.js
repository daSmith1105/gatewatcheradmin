import React from 'react';
import ReactTable from 'react-table';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import '../App.css';

class CustomerControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddCustomer: false,
            showEditCustomer: false,
            rowData: []
        }

        this.customFilter = this.customFilter.bind(this);
        this.toggleAddCustomer = this.toggleAddCustomer.bind(this);
        this.closeAddCustomer = this.closeAddCustomer.bind(this);
        this.toggleEditCustomer = this.toggleEditCustomer.bind(this);
        this.closeEditCustomer = this.closeEditCustomer.bind(this);
        this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
  }

  componentDidMount() {
      this.props.getAllCustomers()
  }

    customFilter = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null && typeof row[id] === "string") {
          return (row[id] !== undefined
            ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            : true);
        }
    }

    toggleAddCustomer() {
        this.setState({
            showAddCustomer: true
        })
    }

    closeAddCustomer() {
        this.setState({
            showAddCustomer: false
        })
    }

    toggleEditCustomer(data) {
        this.setState({
            showEditCustomer: true,
            rowData: data
        })
    }

    closeEditCustomer() {
        this.setState({
            showEditCustomer: false
        })
    }

    handleDeleteCustomer(data) {

    }

    render() {

        const columns = [{
            Header: 'Name',
            accessor: 'sName',
            width: 200,
            id: "name",
            Filter: ({filter, onChange}) => (
                <input
                    onChange={event => onChange(event.target.value)}
                    value={filter ? filter.value : ''}
                    placeholder={'Search ...'}
                    style={{
                        width: '100%',
                        backgroundColor: 'lightgrey',
                        color: 'black',
                    }}
                />
            ),
        
        }, {
            Header: 'Dir',
            accessor: d => '/base/' + d.sDir + '/',
            width: 140,
            id: "dir",
            filterable: false,
      
 
        }, {
            Header: 'Domain',
            accessor: d => d.sDomain + '.dividia.net',
            width: 200,
            id: "domain",
            filterable: false,
 
        }, {
            Header: 'Actions',
            accessor: '',
            width: 200,
            id: "actions",
            sortable: false,
            filterable: false,
            Cell: row => (
                <div>
                        <button onClick={() => this.toggleEditCustomer(row.original)}>Edit</button> 
                        <button onClick={() => this.handleDeleteCustomer(row.original)}>Delete</button> 
                </div>
            ),
        }];

        return(
            <div className="adminControl">
                { !this.state.showAddCustomer && !this.state.showEditCustomer ?
                    <div>
                        <p>Customer Control</p>
                        <ReactTable
                            data={ this.props.customers }
                            columns={columns}
                            filterable
                            defaultFilterMethod={ this.customFilter }
                            style={{
                                height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                              }}
                            defaultPageSize={20}
                            className="-striped -highlight adminEditTable"
                        />
                        <br/><br/>
                        <div className="addButtonContainer">
                            <button onClick={ this.props.closeAdminControl }>Cancel</button> 
                            <button onClick={ () => this.toggleAddCustomer()}>Add Customer</button> 
                        </div>
                        </div> :
                    null
                }

                    { this.state.showAddCustomer ? 
                        <AddCustomer closeAddCustomer={ this.closeAddCustomer }
                                     getAllCustomers={ this.props.getAllCustomers }
                                     isMaster={ this.props.isMaster }
                                     isAdmin={ this.props.isAdmin }/> :
                        null
                    }

                    { this.state.showEditCustomer ? 
                        <EditCustomer closeEditCustomer={ this.closeEditCustomer }
                                      customers={ this.props.customers }
                                      refreshTable={ this.props.refreshTable }
                                      getAllCustomers={ this.props.getAllCustomers }
                                      rowData={ this.state.rowData }
                                      isMaster={ this.props.isMaster }
                                      isAdmin={ this.props.isAdmin } /> :
                        null
                    }
            </div>
        )
    }
}

export default CustomerControl;
