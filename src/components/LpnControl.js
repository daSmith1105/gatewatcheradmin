import React from 'react';
import ReactTable from 'react-table';
import '../App.css';
import AddLPN from './AddLPN';
import EditLPN from './EditLPN';


class LpnControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            showAddLpn: false,
            showEditLpn: false,
            rowData: []
        }

        this.customFilter = this.customFilter.bind(this);
        this.toggleAddLpn = this.toggleAddLpn.bind(this);
        this.closeAddLpn = this.closeAddLpn.bind(this);
        this.toggleEditLpn = this.toggleEditLpn.bind(this);
        this.closeEditLpn = this.closeEditLpn.bind(this);
        this.handleDeleteLpn = this.handleDeleteLpn.bind(this);
    }

    componentDidMount() {
        if(this.props.isMaster) {
            this.props.getAllLpns();
        }
        if(this.props.isAdmin) {
            this.props.getAllLpnsByCustomer();
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

    toggleAddLpn() {
        this.setState({
            showAddLpn: true
        })
    }

    closeAddLpn() {
        this.setState({
            showAddLpn: false
        })
    }

    toggleEditLpn(data) {
        this.setState({
            showEditLpn: true,
            rowData: data
        })
    }

    closeEditLpn() {
        this.setState({
            showEditLpn: false
        })
    }

    handleDeleteLpn(data) {

    }

    render() {

        const columns = [{
            Header: 'Name',
            accessor: 'sLPN',
            width: 120,
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
            width: 180,
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
            Header: 'Company',
            accessor: 'GateCompany.sName',
            width: 180,
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
            Header: 'Flagged',
            accessor: 'fFlagged',
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
            width: 160,
            id: "actions",
            filterable: false,
            Cell: row => (
                <div>
                    <button onClick={() => this.toggleEditLpn(row.original)}>Edit</button>
                    <button onClick={() => this.handleDeleteLpn(row.original)}>Delete</button>
                </div>
            )
        }];

        return(
            <div className="adminControl">
                { !this.state.showAddLpn && !this.state.showEditLpn ?
                    <div>
                        <p>License Plate Control</p>
                        <ReactTable
                            data={ this.props.lpns }
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
                            <button onClick={ () => this.toggleAddLpn() }>Add LicensePlate</button> 
                        </div>
                    </div> :
                    null
                }

                { this.state.showAddLpn ? 
                    <AddLPN  closeAddLpn={ this.closeAddLpn }
                             getAllLpns={ this.props.getAllLpns }
                             getAllLpnsByCustomer={ this.props.getAllLpnsByCustomer }
                             companies={ this.props.companies }
                             customers={ this.props.customers }
                             people={ this.props.people }
                             lpns={ this.props.lpns }
                             customerId={ this.props.customerId }
                             customerName={ this.props.customerName }
                             isMaster={ this.props.isMaster }
                             isAdmin={ this.props.isAdmin } /> :
                    null
                }

                { this.state.showEditLpn ? 
                    <EditLPN    closeEditLpn={ this.closeEditLpn }
                                getAllLpns={ this.props.getAllLpns }
                                getAllLpnsByCustomer={ this.props.getAllLpnsByCustomer }
                                companies={ this.props.companies }
                                customers={ this.props.customers }
                                lpns={ this.props.lpns }
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

export default LpnControl;
