import React from 'react';
import AddPerson from './AddPerson';
import EditPerson from './EditPerson';
import ReactTable from 'react-table';
import '../App.css';


class PersonControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showAddPerson: false,
            showEditPerson: false,
            rowData: []
        }

        this.customFilter = this.customFilter.bind(this);
        this.toggleAddPerson = this.toggleAddPerson.bind(this);
        this.closeAddPerson = this.closeAddPerson.bind(this);
        this.toggleEditPerson = this.toggleEditPerson.bind(this);
        this.closeEditPerson = this.closeEditPerson.bind(this);
        this.handleDeletePerson = this.handleDeletePerson.bind(this);
    }

    componentDidMount() {
        if(this.props.isMaster) {
            this.props.getAllPeople();
        }
        if(this.props.isAdmin) {
            this.props.getAllPeopleByCustomer();
        }
    }

    customFilter = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null && typeof row[id] === "string") {
          return (row[id] !== undefined
            ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            : true);
        }
      }

    toggleAddPerson() {
        if(this.props.lpns.length < 1) {
            alert('must add License Plate number before creating person')
        } else {
        this.setState({
            showAddPerson: true
        })
    }
    }

    closeAddPerson() {
        this.setState({
            showAddPerson: false
        })
    }

    toggleEditPerson(data) {
        this.setState({
            showEditPerson: true,
            rowData: data
        })
    }

    closeEditPerson() {
        this.setState({
            showEditPerson: false
        })
    }

    handleDeletePerson(data) {

    }

    render() {
        const columns = [{
            Header: 'Name',
            accessor: d => `${d.sFirstName} ${d.sLastName}`,
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
            Header: 'Group',
            accessor: 'GateGroup.sName',
            width: 200,
            id: "group",
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
            Header: 'LPN',
            accessor: 'GateLPN.sLPN',
            width: 200,
            id: "lpn",
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
            Header: 'Company',
            accessor: 'GateCompany.sName',
            width: 200,
            id: "company",
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
                    <button onClick={() => this.toggleEditPerson(row.original)}>Edit</button>
                    <button onClick={() => this.handleDeletePerson(row.original)}>Delete</button>
                </div>
            )
        }];

        return(
            <div className="adminControl">

                { !this.state.showAddPerson && !this.state.showEditPerson ?
                    <div>
                        <p>Person Control</p>
                        <ReactTable
                            data={ this.props.people }
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
                            <button onClick={ () => this.toggleAddPerson() }>Add Person</button> 
                        </div>
                    </div> :
                    null 
                }

                { this.state.showAddPerson ? 
                    <AddPerson  closeAddPerson={ this.closeAddPerson }
                                getAllPeople={ this.props.getAllPeople }
                                getAllPeopleByCustomer={ this.props.getAllPeopleByCustomer }
                                people={ this.props.people }
                                customers={ this.props.customers }
                                lpns={ this.props.lpns }
                                companies={ this.props.companies }
                                groups={ this.props.groups }
                                customerId={ this.props.customerId }
                                customerName={ this.props.customerName }
                                isMaster={ this.props.isMaster }
                                isAdmin={ this.props.isAdmin }
                              /> :
                    null
                }
                { this.state.showEditPerson ? 
                    <EditPerson closeEditPerson={ this.closeEditPerson }
                                getAllPeople={ this.props.getAllPeople }
                                getAllPeopleByCustomer={ this.props.getAllPeopleByCustomer }
                                people={ this.props.people }
                                customers={ this.props.customers }
                                companies={ this.props.companies }
                                groups={ this.props.groups }
                                lpns={ this.props.lpns }
                                customerId={ this.props.customerId }
                                customerName={ this.props.customerName }
                                rowData={ this.state.rowData }
                                isMaster={ this.props.isMaster }
                                isAdmin={ this.props.isAdmin }
                              /> :
                    null
                }
            </div>
        )
    }
}

export default PersonControl;
