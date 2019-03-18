import React from 'react';
import AddGateAssignment from './AddGateAssignment';
import EditGateAssignment from './EditGateAssignment';
import ReactTable from 'react-table';
import '../App.css';


class GateAssignmentControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showAddGateAssignment: false,
            showEditGateAssignment: false,
            rowData: []
        }

        this.customFilter = this.customFilter.bind(this);
        this.toggleAddGateAssignment = this.toggleAddGateAssignment.bind(this);
        this.closeAddGateAssignment = this.closeAddGateAssignment.bind(this);
        this.toggleEditGateAssignment = this.toggleEditGateAssignment.bind(this);
        this.closeEditGateAssignment = this.closeEditGateAssignment.bind(this);
        this.handleDeleteGateAssignment = this.handleDeleteGateAssignment.bind(this);
    }

    componentDidMount() {
        if(this.props.isMaster){
            this.props.getAllGuards();
            this.props.getAllGateAssignments();
        }
        if(this.props.isAdmin) {
            this.props.getAllGuardsByCustomer();
            this.props.getAllGateAssignmentsByCustomer();
        }
    }

    toggleAddGateAssignment() {
        this.setState({
            showAddGateAssignment: true
        })
    }

    closeAddGateAssignment() {
        this.setState({
            showAddGateAssignment: false
        })
    }

    toggleEditGateAssignment(data) {
        this.setState({
            showEditGateAssignment: true,
            rowData: data
        })
    }

    closeEditGateAssignment() {
        this.setState({
            showEditGateAssignment: false
        })
    }

    handleDeleteGateAssignment(data) {

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
            accessor: d => d.GateUser.sFirstName + ' ' + d.GateUser.sLastName,
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
            Header: 'Gate',
            accessor: 'Gate.sName',
            width: 200,
            id: "gate",
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
        }, 

        {
            Header: this.props.isMaster ? 'Actions' : null,
            accessor: '',
            width: 200,
            id: "actions",
            sortable: false,
            filterable: false,
            Cell: row => (
                this.props.isMaster ?
                    <div>
                        <button onClick={() => this.toggleEditGateAssignment(row.original)}>Edit</button> 
                        <button onClick={() => this.handleDeleteGateAssignment(row.original)}>Delete</button> 
                    </div> 
                : null
            ),
        } 
    ];

        return(
            <div className="adminControl">

                { !this.state.showAddGateAssignment && !this.state.showEditGateAssignment && this.props.guards.length > 0  ?
                    <div>
                        <p>Gate Assignments</p>
                        <ReactTable
                            data={ this.props.gateAssignments }
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
                        { this.props.isMaster ?
                        <div className="addButtonContainer">
                            <button onClick={ this.props.closeAdminControl }>Cancel</button> 
                            <button onClick={ () => this.toggleAddGateAssignment() }>Add Gate Assignment</button> 
                        </div> : null }
                    </div>:
                    null
                }

                    { this.props.guards.length < 1 ?
                        <div>
                            <p>Please add a guard under users before assignment.</p>
                            <button onClick={ () => this.props.toggleControl('userControl') }>OK</button>
                        </div> :
                        null
                    }

                { this.state.showAddGateAssignment ? 
                    <AddGateAssignment  closeAddGateAssignment={ this.closeAddGateAssignment }
                                        getAllGateAssignments={ this.props.getAllGateAssignments }
                                        getAllGateAssignmentsByCustomer={ this.props.getAllGateAssignmentsByCustomer }
                                        gateAssignments={ this.props.gateAssignments }
                                        customers={ this.props.customers }
                                        gates={ this.props.gates }
                                        guards={ this.props.guards }
                                        customerId={ this.props.customerId }
                                        customerName={ this.props.customerName }
                                        isMaster={ this.props.isMaster }
                                        isAdmin={ this.props.isAdmin } /> :
                    null
                }

                { this.state.showEditGateAssignment ? 
                    <EditGateAssignment     closeEditGateAssignment={ this.closeEditGateAssignment }
                                            getAllGateAssignments={ this.props.getAllGateAssignments }
                                            getAllGateAssignmentsByCustomer={ this.props.getAllGateAssignmentsByCustomer }
                                            gateAssignments={ this.props.gateAssignments }
                                            customers={ this.props.customers }
                                            gates={ this.props.gates }
                                            guards={ this.props.guards }
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

export default GateAssignmentControl;
