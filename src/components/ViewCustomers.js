import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import '../App.css';


class ViewCustomers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            customerList: []
        }

        this.getTableUpdate = this.getTableUpdate.bind(this);
    }

    componentWillMount() {
        this.getTableUpdate();
    }

    getTableUpdate() {
        fetch('/api/gatecustomers')
        .then( response => response.json())
        .then(data => {
            this.setState({ customerList: data },
                () => console.log(this.state.customerList))
        })
        .catch(error => console.error('Error:', error));
    }


    render() {
        
        const columns = [{
            Header: 'Id',
            accessor: 'id',
          }, {
            Header: 'Name',
            accessor: 'sName',
          }, {
            Header: 'Directory',
            accessor: 'sDir',
          }, {
            Header: 'Domain',
            accessor: 'sDomain'
        }];

        const data = this.state.customerList;

        return(
            <div>
                { this.props.refreshCustomerTable ? [ this.getTableUpdate(), this.props.updateCustomerTable() ] : null }
                <h1>Gate Customers</h1>
                { this.state.customerList.length > 0 ?
                    <div >
                        <input type="button" value="refresh list" onClick={ () => this.getTableUpdate() } />
                        <br /><br />
                        <ReactTable
                            data={data}
                            columns={columns}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            />
                       
                    </div> : 
                        null
                    }
            </div>
        )
    }
}

export default ViewCustomers;

