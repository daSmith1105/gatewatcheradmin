import React from 'react';
import AddCompany from './AddCompany';
import EditCompany from './EditCompany';
import ReactTable from 'react-table';
import '../App.css';


class CompanyControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showAddCompany: false,
            showEditCompany: false,
            rowData: []
        }

        this.customFilter = this.customFilter.bind(this);
        this.toggleAddCompany = this.toggleAddCompany.bind(this);
        this.closeAddCompany = this.closeAddCompany.bind(this);
        this.toggleEditCompany = this.toggleEditCompany.bind(this);
        this.closeEditCompany = this.closeEditCompany.bind(this);
        this.handleDeletCompany = this.handleDeleteCompany.bind(this);
    }

    componentDidMount() {
        if(this.props.isMaster) {
            this.props.getAllCompanies()
        }
        if(this.props.isAdmin) {
            this.props.getAllCompaniesByCustomer()
        }
    }

    toggleAddCompany() {
        this.setState({
            showAddCompany: true
        })
    }

    closeAddCompany() {
        this.setState({
            showAddCompany: false
        })
    }

    toggleEditCompany(data) {
        this.setState({
            showEditCompany: true,
            rowData: data
        })
    }

    closeEditCompany() {
        this.setState({
            showEditCompany: false
        })
    }

    handleDeleteCompany(data) {

    }

    customFilter = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null && typeof row[id] === "string") {
          return (row[id] !== undefined
            ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            : true);
        }
      }

    render() {
   
        const columns = [{
            Header: 'Name',
            accessor: 'sName',
            width: 220,
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
            Header: 'Customer',
            accessor: 'GateCustomer.sName',
            width: 200,
            id: "customer",
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
            Header: 'Flagged',
            accessor: d => d.fFlagged.toString(),
            width: 200,
            id: "flagged",
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
            Header: 'Actions',
            accessor: '',
            width: 200,
            id: "actions",
            filterable: false,
            sortable: false,
            Cell: row => (
                <div>
                    <button onClick={() => this.toggleEditCompany(row.original)}>Edit</button>
                    <button onClick={() => this.handleDeleteCompany(row.original)}>Delete</button>
                </div>
            )
        }];

        return(
            <div className="adminControl">

                { !this.state.showAddCompany && !this.state.showEditCompany ?
                    <div>
                        <p>Company Control</p>
                        <ReactTable
                            data={ this.props.companies }
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
                            <button onClick={ () => this.toggleAddCompany() }>Add Company</button> 
                        </div>
                    </div> :
                    null 
                }

                { this.state.showAddCompany ? 
                    <AddCompany closeAddCompany={ this.closeAddCompany }
                                getAllCompanies={ this.props.getAllCompanies }
                                getAllCompaniesByCustomer={ this.props.getAllCompaniesByCustomer }
                                companies={ this.props.companies }
                                customers={ this.props.customers }
                                customerId={ this.props.customerId }
                                customerName={ this.props.customerName }
                                isMaster={ this.props.isMaster }
                                isAdmin={ this.props.isAdmin } /> :
                    null
                }

                { this.state.showEditCompany ? 
                    <EditCompany    closeEditCompany={ this.closeEditCompany }
                                    getAllCompanies={ this.props.getAllCompanies }
                                    getAllCompaniesByCustomer={ this.props.getAllCompaniesByCustomer }
                                    refreshTable={ this.props.refreshTable }
                                    companies={ this.props.companies }
                                    customers={ this.props.customers }
                                    customerId={ this.props.customerId }
                                    customerName={ this.props.customerName }
                                    rowData={ this.state.rowData }
                                    isMaster={ this.props.isMaster }
                                    isAdmin={ this.props.isAdmin } /> :
                    null
                }
            </div>
        )
    }
}

export default CompanyControl;
