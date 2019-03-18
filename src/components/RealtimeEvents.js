import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import ImageModal from './ImageModal';
import PdfViewer from './PdfViewer';
import "react-table/react-table.css";
import '../App.css';

export default class RealtimeEvents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showPreviewImage: false,
            currentImageURI: '',
            showPdfViewer: false,
            currentPdfData: {},
            showPassengerViewer: false,
          }

        this.launchImageModal = this.launchImageModal.bind(this);
        this.closeImageModal = this.closeImageModal.bind(this);
        this.launchPdfViewer = this.launchPdfViewer.bind(this);
        this.closePdfViewer = this.closePdfViewer.bind(this);
        this.launchPassengerViewer = this.launchPassengerViewer.bind(this);
     }

    componentDidMount () {
      this.addFilterPlaceholder();
    }
    componentWillUnmount() {
        this.setState({ clearInterval: true })
    }

    addFilterPlaceholder = () => {
        const filters = document.querySelectorAll("div.rt-th > input");
          for (let filter of filters) {
            filter.placeholder = "Search..";
          }
        }

    launchImageModal(value) {
        this.setState({ 
            showPreviewImage: true,
            currentImageURI: value
        })
    }

    closeImageModal() {
        this.setState({ 
            showPreviewImage: false,
            currentImageURI: ''
        })
    }

    launchPdfViewer(value) {
        this.setState({ 
            showPdfViewer: true,
            currentPdfData: value
        })
    }

    closePdfViewer() {
        this.setState({ 
            showPdfViewer: false,
            currentPdfData: ''
        })
    }

    launchPassengerViewer(value) {
      console.log(value)
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
    
    customFilter = (filter, row) => {
        const id = filter.pivotId || filter.id;
        if (row[id] !== null && typeof row[id] === "string") {
          return (row[id] !== undefined
            ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            : true);
        }
      }

    render() {
      console.log(this.props.events)
        const columns = [{
            Header: 'Date',
            accessor: d => moment(d.createdAt).format('MM/DD/YY'),
            width: 80,
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
            Header: 'Time',
            accessor: d => moment(d.createdAt).format('h:mm:ss a'),
            width: 100,
            id: "time",
            // use startsWith to parse string from index 10
            filterMethod: (filter, row) => (row[filter.id].startsWith(filter.value, 10, row[filter.id].length -1 )),
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
            Header: 'Type',
            accessor: 'GateType.sName',
            id: "type",
            width: 90,
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
            width: 140,
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
            Header: 'Customer',
            accessor: 'GateCustomer.sName',
            width: 160,
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
              width: 140,
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
            Header: 'Driver',
            accessor: d => d.GatePerson.sFirstName + ' ' + d.GatePerson.sLastName,
            width: 120,
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
          Header: 'Passengers',
          accessor: d => JSON.stringify(d.aPassengers),
          width: 120,
          id: "passengers",
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
            Cell: cellInfo => (
              cellInfo.original.aPassengers !== null ?
              <button onClick={ () => this.launchPassengerViewer(cellInfo.original)}>View</button> :
              <span>N/A</span>  
          )
        }, {
            Header: 'LPN',
            accessor: 'GateLPN.sLPN',
            width: 80,
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
            Header: 'Logged By',
            accessor: d => d.GateUser.sFirstName + ' ' + d.GateUser.sLastName,
            width: 115,
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
            Header: 'Comment',
            accessor: 'sComment',
            width: 120,
            id: "comment",
            filterable: false,
            Cell: row => <div><span title={row.value}>{row.value}</span></div>
        }, {
            Header: 'LPN Photo',
            accessor: 'sLpnPhoto',
            width: 90,
            filterable: false,
            Cell: ({value}) => (<button onClick={ () => this.launchImageModal({value}.value.toString().slice(8))}>View</button>)
        }, {
            Header: 'Load Photo',
            accessor: 'sLoadPhoto',
            width: 95,
            filterable: false,
            Cell: ({value}) => (<button onClick={ () => this.launchImageModal({value}.value.toString().slice(8))}>View</button>)
        }, {
            Header: 'PDF',
            accessor: 'pdf',
            width: 85 ,
            filterable: false,
            Cell: cellInfo => (
                <button onClick={ () => {
                    this.launchPdfViewer(cellInfo.original)
                }}>
                    View PDF
                </button>
            )
        }];
           
      return(
            <div>
                { this.props.events.length > 0 ? 
                <div>
                    {/* <button onClick={ () => this.getEvents() }
                            style={{ position: 'absolute', top: '150px', right: '40px' }}>Manually Refresh Table</button> */}

                    { this.state.showPreviewImage && this.state.currentImageURI !== '' ? 
                        <ImageModal closeImageModal={ this.closeImageModal }
                                    imageURI={ this.state.currentImageURI } /> : 
                        null }

                    { this.state.showPdfViewer && this.state.currentPdfData !== '' ? 
                    <PdfViewer closePdfViewer={ this.closePdfViewer }
                                pdfData={ this.state.currentPdfData } /> : 
 
                    null }

                    <ReactTable
                        data={ this.props.events }
                        columns={columns}
                        filterable
                        defaultFilterMethod={ this.customFilter }
                        style={{
                          height: "calc( 100vh - 210px)" // This will force the table body to overflow and scroll, since there is not enough room
                        }}
                        defaultSorted={[
                          { id: "date", desc: true },
                          { id: "time", desc: true }
                        ]}
                        defaultPageSize={20}
                        className="-striped -highlight transactionScreen"
                        getTrProps={ this.getTrProps }
                    />
                </div> :
                        <div className="transactionScreen transactionScreenLoading">
                            <span>Loading ....</span>
                        </div> 
                }
                    
            </div>
      )
    }
}
