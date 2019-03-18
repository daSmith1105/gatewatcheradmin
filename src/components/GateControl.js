import React from 'react';
import AddGate from './AddGate';
import EditGate from './EditGate';
import ReactTable from 'react-table';
import '../App.css';


class GateControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showAddGate: false,
            showEditGate: false,
            rowData: []
        }

        this.customFilter = this.customFilter.bind(this);
        this.toggleAddGate = this.toggleAddGate.bind(this);
        this.closeAddGate = this.closeAddGate.bind(this);
        this.toggleEditGate = this.toggleEditGate.bind(this);
        this.closeEditGate = this.closeEditGate.bind(this);
        this.handleDeleteGate = this.handleDeleteGate.bind(this);
    }

    componentDidMount() {
        if(this.props.isMaster) {
            this.props.getAllGates()
        }
        if(this.props.isAdmin) {
            this.props.getAllGatesByCustomer()
        }
    }

    toggleAddGate() {
        this.setState({
            showAddGate: true
        })
    }

    closeAddGate() {
        this.setState({
            showAddGate: false
        })
    }

    toggleEditGate(data) {
        this.setState({
            showEditGate: true,
            rowData: data
        })
    }

    closeEditGate() {
        this.setState({
            showEditGate: false
        })
    }

    handleDeleteGate(data) {

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
        console.log(this.props)
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
            Header: 'Directory',
            accessor: d => '/base/' + d.sDir,
            width: 140,
            id: "directory",
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
            Header: 'Report Errors',
            accessor: 'fReportErrors',
            width: 180,
            id: "reportErrors",
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
            Header: 'Actions',
            accessor: '',
            width: 200,
            id: "actions",
            filterable: false,
            Cell: row => (
                <div>
                    <button onClick={() => this.toggleEditGate(row.original)}>Edit</button>
                    <button onClick={() => this.handleDeleteGate(row.original)}>Delete</button>
                </div>
            )
        }];

        return(
            <div className="adminControl">

                { !this.state.showAddGate && !this.state.showEditGate ?
                    <div>
                        <p>Gate Control</p>
                        <ReactTable
                            data={ this.props.gates }
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
                            <button onClick={ () => this.toggleAddGate() }>Add Gate</button> 
                        </div>
                    </div> :
                    null 
                }

                { this.state.showAddGate ? 
                    <AddGate closeAddGate={ this.closeAddGate }
                             getAllGates={ this.props.getAllGates }
                             getAllGatesByCustomer={ this.props.getAllGatesByCustomer }
                             gates={ this.props.gates }
                             guards={ this.props.guards }
                             customers={ this.props.customers }
                             customerId={ this.props.customerId }
                             customerName={ this.props.customerName }
                             isMaster={ this.props.isMaster }
                             isAdmin={ this.props.isAdmin } /> :
                    null
                }

                { this.state.showEditGate ? 
                    <EditGate   closeEditGate={ this.closeEditGate }
                                getAllGates={ this.props.getAllGates }
                                getAllGatesByCustomer={ this.props.getAllGatesByCustomer }
                                gates={ this.props.gates }
                                guards={ this.props.guards }
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

export default GateControl;
