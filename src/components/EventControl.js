import React from 'react';
import AddEvent from './AddEvent';
import EditEvent from './EditEvent';
import ReactTable from 'react-table';
import '../App.css';


class EventControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showAddEvent: false,
            showEditEvent: false,
            rowData: []
        }

        this.customFilter = this.customFilter.bind(this);
        this.toggleAddEvent = this.toggleAddEvent.bind(this);
        this.closeAddEvent = this.closeAddEvent.bind(this);
        this.toggleEditEvent = this.toggleEditEvent.bind(this);
        this.closeEditEvent = this.closeEditEvent.bind(this);
    }

    componentDidMount() {
        if(this.props.isMaster) {
            this.props.getAllEvents()
        }
        if(this.props.isAdmin) {
            this.props.getAllEventsByCustomer()
        }
    }

    toggleAddEvent() {
        this.setState({
            showAddEvent: true
        })
    }

    closeAddEvent() {
        this.setState({
            showAddEvent: false
        })
    }

    toggleEditEvent(data) {
        this.setState({
            showEditEvent: true,
            rowData: data
        })
    }

    closeEditEvent() {
        this.setState({
            showEditEvent: false
        })
    }

    customFilter = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null && typeof row[id] === "string") {
          return (row[id] !== undefined
            ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            : true);
        }
      }
    
    getTrProps = (state, rowInfo, column, instance) => {
    if (rowInfo) {
        return {
        style: {
            background: rowInfo.original.GateType.sName === 'OUT' ? 'lightblue' : 
                        rowInfo.original.GateType.sName=== 'IN' ? 'lightgreen' : 
                        rowInfo.original.GateType.sName === 'ACCIDENT' ? 'red' : 
                        rowInfo.original.GateType.sName === 'DENIED' ? 'yellow' : 
                        'white',
            border: '2px solid grey',
        }
        }
    }
    
        return {};
      }

    render() {
        const columns = [{

            Header: 'Date',
            accessor: 'createdAt',
            width: 100,
            id: "date",
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
            width: 100,
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
            Header: 'Type',
            accessor: 'GateType.sName',
            width: 100,
            id: "type",
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
            width: 100,
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
            Header: 'Gate',
            accessor: 'Gate.sName',
            width: 100,
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
        }, {
            Header: 'Driver',
            accessor: d => d.GatePerson.sFirstName + ' ' + d.GatePerson.sLastName,
            width: 100,
            id: "driver",
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
            width: 100,
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
            Header: 'Comments',
            accessor: 'sComment',
            width: 100,
            id: "comment",
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
            Cell: row => <div><span title={row.value}>{row.value}</span></div>
        }, {
            Header: 'LPN Photo',
            accessor: 'sLpnPhoto',
            width: 100,
            id: "lpnPhoto",
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
            Header: 'Load Photo',
            accessor: 'sLoadPhoto',
            width: 100,
            id: "loadPhoto",
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
            Header: 'Guard',
            accessor: d => d.GateUser.sFirstName + ' ' + d.GateUser.sLastName,
            width: 100,
            id: "guard",
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
            width: 100,
            id: "actions",
            filterable: false,
            sortable: false,
            Cell: row => (
                <div>
                    <button onClick={() => this.toggleEditEvent(row.original)}>Edit</button>
                    <button onClick={() => this.props.handleDeleteEvent(row.original)}>Delete</button>
                </div>
            )
        }];

        return(
            <div className="adminControl" style={{ height: '100vh'}}>

                { !this.state.showAddEvent && !this.state.showEditEvent ?
                    <div>
                        <p>Event Control</p>
                        <ReactTable
                            data={ this.props.events }
                            columns={columns}
                            filterable
                            defaultFilterMethod={ this.customFilter }
                            style={{
                                height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                              }}
                            defaultSorted={[
                            { id: "date", desc: true },
                            { id: "time", desc: true }
                            ]}
                            defaultPageSize={20}
                            className="-striped -highlight adminEditTable"
                            getTrProps={ this.getTrProps }
                        />
                        <br/><br/>
                        <div className="addButtonContainer">
                            <button onClick={ this.props.closeAdminControl }>Cancel</button> 
                            <button onClick={ () => this.toggleAddEvent()}>Add Event</button> 
                        </div>
                    </div> : 
                    null 
                }

                { this.state.showAddEvent ? 
                        <AddEvent closeAddEvent={ this.closeAddEvent }
                                     getAllEvents={ this.props.getAllEvents }
                                     getAllEventsByCustomer={ this.props.getAllEventsByCustomer }
                                     getAllEventsByGate={ this.props.getAllEventsByGate }
                                     customers={ this.props.customers }
                                     gateTypes={ this.props.gateTypes }
                                     companies={ this.props.companies }
                                     eventTypes={ this.props.eventTypes }
                                     gates={ this.props.gates }
                                     people={ this.props.people }
                                     lpns={ this.props.lpns }
                                     users={ this.props.users }
                                     groups={ this.props.groups }
                                     userId={ this.props.userId }
                                     fullName={ this.props.fullName }
                                     assignedGate={ this.props.assignedGate }
                                     assignedGateName={ this.props.assignedGateName }
                                     customerId={ this.props.customerId }
                                     customerName={ this.props.customerName }
                                     isMaster={ this.props.isMaster }
                                     isAdmin={ this.props.isAdmin }
                                     isGuard={ this.props.isGuard }
                                     /> :
                        null
                    }

                { this.state.showEditEvent ? 
                        <EditEvent   closeEditEvent={ this.closeEditEvent }
                                     getAllEvents={ this.props.getAllEvents }
                                     getAllEventsByCustomer={ this.props.getAllEventsByCustomer }
                                     getAllEventsByGate={ this.props.getAllEventsByGate }
                                     customers={ this.props.customers }
                                     gateTypes={ this.props.gateTypes }
                                     companies={ this.props.companies }
                                     gates={ this.props.gates }
                                     people={ this.props.people }
                                     lpns={ this.props.lpns }
                                     users={ this.props.users }
                                     groups={ this.props.groups }
                                     eventTypes={ this.props.eventTypes }
                                     customerId={ this.props.customerId }
                                     userId={ this.props.userId }
                                     fullName={ this.props.fullName }
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

export default EventControl;
