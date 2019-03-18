import React, { Component } from 'react';
import './App.css';
import LoginScreen from './screens/LoginScreen';
import Header from './components/Header';
import AdminBar from './components/AdminBar';
import AdminScreen from './screens/AdminScreen';
import TransactionMonitor from './screens/TransactionMonitor';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,

      authId: null,
      userId:null,
      firstName: '',
      lastName: '',
      fullName: '',
      customerId: null,
      customerName: '',
      assignedGate: null,
      assignedGateName: '',

      isAdmin: false,
      isMaster: false,
      isGuard: false,
      isClient: false,

      authTypes: [],
      eventTypes: [],
      groups: [],
      customers: [],
      users: [],
      guards: [],
      companies: [],
      gates: [],
      lpns: [],
      events: [],
      people: [],
      gateAssignments: [],
      eventCount: 0,

      showAdminControl: false,

      customerControl: false,
      userControl: false,
      gateControl: false,
      companyControl: false,
      personControl: false,
      lpnControl: false,
      eventControl: false,
      guardAssignmentControl: false,

      success: false,
      error: false,
      response: '',
    }
  }

  componentWillMount() {
    this.hydrateStateWithLocalStorage();
  }

  componentDidMount() {
      this.getMasterData();
      this.getAdminData();
      this.getGuardData();
      this.getClientData();
  }

  hydrateStateWithLocalStorage = () => {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage = () => {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  // User data and get/set upon successful login - from Login
  getUserData = (data) => {
    console.log(data.GateAssignment)
    if(data.bAuthID === 1) {
      this.setState({ 
        isMaster: true
      }, () => this.getMasterData())
    }
    if(data.bAuthID === 2) {
      this.setState({ 
        isAdmin: true,
       }, () => this.getAdminData())
    }
    if(data.bAuthID === 3) {
      // Get assigned gate name
      fetch('http://192.168.0.144:3000/api/gatebyid/' + data.GateAssignment.id)
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ assignedGateName: data.sName }, 
          () => this.saveStateToLocalStorage() )
        })
      .catch(error => {
          console.error('Error:', error);
          this.setState({ error: true })
      })

      this.setState({ 
        isGuard: true,
        assignedGate: data.GateAssignment.id,
      }, () => this.getGuardData())
    }
    if(data.bAuthID === 4) {
      this.setState({ 
        isClient: true
      }, () => this.getClientData())
    }
    this.setState({
      isLoggedIn: true,
      authId: data.bAuthID,
      userId: data.id,
      firstName: data.sFirstName,
      lastName: data.sLastName,
      fullName: data.sFirstName + ' ' + data.sLastName,
      customerId: data.GateCustomer.id, 
      customerName: data.GateCustomer.sName
    }, () => {
      this.saveStateToLocalStorage()
      this.getAllAuthTypes()
      this.getAllEventTypes()
      this.getAllPersonGroups()

    })
  }

  // Universal data needed for all bAuthTypes
  getAllAuthTypes = () => {
    fetch('http://192.168.0.144:3000/api/gateauthtypes')
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ authTypes: data.rows }, 
        () => this.saveStateToLocalStorage() )
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  getAllEventTypes = () => {
    fetch('http://192.168.0.144:3000/api/gatetypes')
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ eventTypes: data.rows }, 
        () => this.saveStateToLocalStorage() )
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  getAllPersonGroups = () => {
    fetch('http://192.168.0.144:3000/api/gategroups')
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ groups: data.rows }, 
        () => this.saveStateToLocalStorage() )
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
        this.hydrateStateWithLocalStorage()
    })
  }


  // if isMaster
  getMasterData = () => {
    if( this.state.isMaster ) {
      console.log('logged in as master')
      this.getAllCustomers()
      this.getAllUsers()
      this.getAllCompanies()
      this.getAllGates()
      this.getAllLpns()
      this.getAllEvents()
      this.getAllPeople()
      this.getAllGateAssignments()
      this.getAllGuards()
      this.saveStateToLocalStorage()
    } else {
      return;
    }
  }

  getAllCustomers = () => {
    fetch('http://192.168.0.144:3000/api/gatecustomers')
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ customers: data.rows })
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  getAllUsers = () => {
    fetch('http://192.168.0.144:3000/api/gateusers')
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data.rows })
        })
      .catch(error => {
          console.error('Error:', error);
          this.setState({ error: true })
      })
  }

  getAllGuards = () => {
    fetch('http://192.168.0.144:3000/api/gateguards')
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ guards: data.rows })
        })
      .catch(error => {
          console.error('Error:', error);
          this.setState({ error: true })
      })
  }

  getAllCompanies = () => {
    fetch('http://192.168.0.144:3000/api/gatecompanies')
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ companies: data.rows })
        }, () => this.saveStateToLocalStorage() )
      .catch(error => {
          console.error('Error:', error);
          this.setState({ error: true })
          this.hydrateStateWithLocalStorage()
      })
  }

  getAllGates = () => {
    fetch('http://192.168.0.144:3000/api/gates')
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      }, () => this.saveStateToLocalStorage() )
      .then(response => response.json())
      .then(data => {
        this.setState({ gates: data.rows })
        })
      .catch(error => {
          console.error('Error:', error);
          this.setState({ error: true })
          this.hydrateStateWithLocalStorage()
      })
  }

  getAllLpns = () => {
    fetch('http://192.168.0.144:3000/api/gatelpns')
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ lpns: data.rows })
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  getAllEvents = () => {
    fetch('http://192.168.0.144:3000/api/gateevents')
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      if( data.count > this.state.eventCount ) {
          this.setState({ 
            events: data.rows,
            eventCount: data.count
          }, () => this.saveStateToLocalStorage())
        }
      })
      .catch(error => {
          console.error('Error:', error);
          this.setState({ error: true })
      })
  }

  getAllPeople = () => {
    fetch('http://192.168.0.144:3000/api/gatepeople')
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ people: data.rows })
      }, () => this.saveStateToLocalStorage())
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  getAllGateAssignments = () => {
    fetch('http://192.168.0.144:3000/api/gateassignments')
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ gateAssignments: data.rows })
      }, () => this.saveStateToLocalStorage())
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
        this.hydrateStateWithLocalStorage()
    })
  }

// if isAdmin
  getAdminData = () => {
    if( this.state.isAdmin ) {
      console.log('logged in as admin')
      this.getAllUsersByCustomer()
      this.getAllCompaniesByCustomer()
      this.getAllGatesByCustomer()
      this.getAllLpnsByCustomer()
      this.getAllEventsByCustomer()
      this.getAllPeopleByCustomer()
      this.getAllGateAssignmentsByCustomer()
      this.getAllGuardsByCustomer()
    } else {
      return;
    }
  }

  getAllUsersByCustomer = () => {
    fetch('http://192.168.0.144:3000/api/gateusersbycustomer/' + this.state.customerId)
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({ 
        users: data.rows,
      }, this.saveStateToLocalStorage() )
    })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  getAllCompaniesByCustomer = () => {
    fetch('http://192.168.0.144:3000/api/gatecompaniesbycustomer/' +  this.state.customerId)
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ 
        companies: data.rows 
      }, this.saveStateToLocalStorage())
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  getAllGuardsByCustomer = () => {
    fetch('http://192.168.0.144:3000/api/gateguardsbycustomer/' + this.state.customerId)
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          guards: data.rows 
        }, () => this.saveStateToLocalStorage() )
      })
      .catch(error => {
          console.error('Error:', error);
          this.setState({ error: true })
      })
  }

  getAllGatesByCustomer = () => {
    fetch('http://192.168.0.144:3000/api/gatesbycustomer/' + this.state.customerId)
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ 
        gates: data.rows
      }, this.saveStateToLocalStorage() )
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
        this.hydrateStateWithLocalStorage()
    })
  }

  getAllLpnsByCustomer = () => {
    fetch('http://192.168.0.144:3000/api/gatelpnsbycustomer/' + this.state.customerId)
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ 
        lpns: data.rows
      }, this.saveStateToLocalStorage() )
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })

  }

  getAllEventsByCustomer = () => {
    fetch('http://192.168.0.144:3000/api/gateeventsbycustomer/' + this.state.customerId)
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
        if( data.count > this.state.eventCount ) {
          this.setState({ 
            events: data.rows,
            eventCount: data.count
          }, () => this.saveStateToLocalStorage())
        }
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })

  }

  getAllPeopleByCustomer = () => {
    fetch('http://192.168.0.144:3000/api/gatepeoplebycustomer/' + this.state.customerId)
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ 
        people: data.rows 
      }, this.saveStateToLocalStorage() )
      })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  // if isGuard
  getGuardData = () => {
    if( this.state.isGuard ) {
      console.log('logged in as guard')
      this.getAllEventsByGate()
      this.getAllLpnsByCustomer()
      this.getAllPeopleByCustomer()
      this.getAllCompaniesByCustomer()
    } else {
      return;
    }
  }

  getAllEventsByGate = () => {
    fetch( 'http://192.168.0.144:3000/api/gateeventsbygate/' + this.state.assignedGate )
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      if( data.count > this.state.eventCount ) {
        this.setState({ 
          events: data.rows,
          eventCount: data.count
        }, () => this.saveStateToLocalStorage())
      }
    })
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  // if isClient
  getClientData = () => {
    if( this.state.isClient ) {
      console.log('logged in as client')
      this.getAllUsersByCustomer()
      this.getAllCompaniesByCustomer()
      this.getAllGatesByCustomer()
      this.getAllLpnsByCustomer()
      this.getAllEventsByCustomer()
      this.getAllPeopleByCustomer()
      this.getAllGateAssignmentsByCustomer()
      this.getAllGuardsByCustomer()
    } else {
      return;
    }
  }

  getAllGateAssignmentsByCustomer = () => {
    fetch('http://192.168.0.144:3000/api/gateassignmentsbycustomer/' + this.state.customerId)
    .then(function(response) {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(data => {
      this.setState({ gateAssignments: data }, 
        () => console.log( this.state.gateAssignments ))
      }, () => this.saveStateToLocalStorage())
    .catch(error => {
        console.error('Error:', error);
        this.setState({ error: true })
    })
  }

  // AdminBar Controller
  toggleControl = (name) => {
    this.setState({ 
        customerControl: false,
        userControl: false,
        gateControl: false,
        companyControl: false,
        personControl: false,
        lpnControl: false,
        eventControl: false,
        gateAssignmentControl: false, 
    }, () => {
      this.setState({  
        [name]: true,
        showAdminControl: true
      })
    })
  }

  closeAdminControl = () => {
    this.setState({
      eventControl: false,
      lpnControl: false,
      customerControl: false,
      userControl: false,
      companyControl: false,
      personControl: false,
      gateControl: false,
      showAdminControl: false,
      gateAssignmentControl: false,
    })
  }

  // Refresh Transaction Table
  refreshTable = () => {
    this.setState({ refresh: true }, () => this.setState({ refresh: false }))
  }

  clearLocalStorage = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authId');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('fullName');
    localStorage.removeItem('customerId');
    localStorage.removeItem('customerName');

    localStorage.removeItem('isMaster');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isGuard');
    localStorage.removeItem('isClient');

    localStorage.removeItem('customers');
    localStorage.removeItem('companies');
    localStorage.removeItem('gates');
    localStorage.removeItem('events');
    localStorage.removeItem('users');
    localStorage.removeItem('people');
    localStorage.removeItem('guards');
    localStorage.removeItem('authTypes');
    localStorage.removeItem('gateAssignments');
    localStorage.removeItem('groups');
    localStorage.removeItem('eventTypes');
    localStorage.removeItem('assignedGate');
    localStorage.removeItem('eventCount');
  }

  doLogout = () => {
    this.setState({
      isLoggedIn: false,

      authId: null,
      userId:null,
      firstName: '',
      lastName: '',
      fullName: '',
      customerId: null,
      customerName: '',

      isAdmin: false,
      isMaster: false,
      isGuard: false,
      isClient: false,

      showAdminControl: false,
      customerControl: false,
      userControl: false,
      gateControl: false,
      companyControl: false,
      personControl: false,
      lpnControl: false,
      eventControl: false,
      guardAssignmentControl: false,
      customers: [],
      companies: [],
      gates: [],
      lpns: [],
      events: [],
      users: [],
      people: [],
      guards: [],
      gateAssignments: [],
      authTypes: [],
      groups: [],
      eventTypes: [],
      gateSpecificEvents: [],
      assignedGate: null,
      deletedUsers:[],
      eventCount: 0,

      success: false,
      error: false,
      response: '',
      refresh: false,
    })
    this.clearLocalStorage();
  }

  render() {
    return (
      <div className="App">

        { this.state.isLoggedIn ?

          <div>
            <Header 
                    authId={ this.state.authId }
                    fullName={ this.state.fullName }
                    customerId={ this.state.customerId }
                    customerName={ this.state.customerName }
                    doLogout={ this.doLogout } /> 

{/* Guard Access Only */}               
            { this.state.isGuard ?
              <div className="addEventButtonContainer">
                <button onClick={ () => this.toggleControl('eventControl') }
                        className="addEventButton" >
                  Add Event
                </button>
              </div> :
              null
            }


{/* Admin Access Only */}
            { this.state.isAdmin || this.state.isMaster ?

              <AdminBar toggleControl={ this.toggleControl }
                        closeAdminControl={ this.closeAdminControl }
                        showCustomerControl= { this.state.customerControl }
                        showGateControl={ this.state.gateControl }
                        showUserControl={ this.state.userControl }
                        showCompanyControl={ this.state.companyControl }
                        showPersonControl={ this.state.personControl }
                        showLpnControl={ this.state.lpnControl }
                        showEventControl={ this.state.eventControl }
                        showGateAssignmentControl={ this.state.gateAssignmentControl }

                        isMaster={ this.state.isMaster }
                        isAdmin={ this.state.isAdmin }
                        isGuard={ this.state.isGuard }
                        isClient={ this.state.isClient } /> :
              <div className="adminBarSpacer"></div>
            }

            { this.state.showAdminControl ? 
            
              <AdminScreen  authTypes={ this.state.authTypes }
                            eventTypes={ this.state.eventTypes }
                            groups={ this.state.groups }
                            userId={ this.state.userId }
                            customerId={ this.state.customerId }
                            customerName={ this.state.customerName }

                            closeAdminControl={ this.closeAdminControl }
                            toggleControl={ this.toggleControl }
                            showCustomerControl= { this.state.customerControl }
                            showGateControl={ this.state.gateControl }
                            showUserControl={ this.state.userControl }
                            showCompanyControl={ this.state.companyControl }
                            showPersonControl={ this.state.personControl }
                            showLpnControl={ this.state.lpnControl }
                            showEventControl={ this.state.eventControl }
                            showGateAssignmentControl={ this.state.gateAssignmentControl }

                            customers={ this.state.customers }
                            companies={ this.state.companies }
                            gates={ this.state.gates }
                            lpns={ this.state.lpns }
                            events={ this.state.events }
                            users={ this.state.users }
                            people={ this.state.people }
                            guards={ this.state.guards }
                            gateAssignments={ this.state.gateAssignments }

                            getAllCustomers={ this.getAllCustomers }
                            getAllUsers={ this.getAllUsers }
                            getAllUsersByCustomer={ this.getAllUsersByCustomer }
                            getAllCompanies={ this.getAllCompanies }
                            getAllCompaniesByCustomer={ this.getAllCompaniesByCustomer }
                            getAllGates={ this.getAllGates }
                            getAllGatesByCustomer={ this.getAllGatesByCustomer }
                            getAllLpns={ this.getAllLpns }
                            getAllLpnsByCustomer={ this.getAllLpnsByCustomer }
                            getAllEvents={ this.getAllEvents }
                            getAllEventsByCustomer={ this.getAllEventsByCustomer }
                            getAllEventsByGate={ this.getAllEventsByGate }
                            getAllPeople={ this.getAllPeople }
                            getAllPeopleByCustomer={ this.getAllPeopleByCustomer }
                            getAllGateAssignments={ this.getAllGateAssignments }
                            getAllGateAssignmentsByCustomer={ this.getAllGateAssignmentsByCustomer }
                            getAllGuards={ this.getAllGuards }
                            getAllGuardsByCustomer={ this.getAllGuardsByCustomer }

                            fullName={ this.state.fullName }
                            assignedGate={ this.state.assignedGate }
                            assignedGateName={ this.state.assignedGateName }

                            isMaster={ this.state.isMaster }
                            isAdmin={ this.state.isAdmin }
                            isGuard={ this.state.isGuard }
                            isClient={ this.state.isClient }
                            
                            refreshTable={ this.refreshTable } /> :
              null
            }

{/* All Access */}
            <TransactionMonitor isLoggedIn={ this.state.isLoggedIn } 
                                userId={this.state.userId }
                                customerId={ this.state.customerId }
                                events={ this.state.events }
                                refresh={ this.state.refresh }
                                refreshTable={ this.refreshTable }
                                getAllEvents={ this.getAllEvents }
                                getAllEventsByCustomer={ this.getAllEventsByCustomer }
                                getAllEventsByGate={ this.getAllEventsByGate }

                                isMaster={ this.state.isMaster }
                                isAdmin={ this.state.isAdmin }
                                isGuard={ this.state.isGuard }
                                isClient={ this.state.isClient } />
                                
          </div> :

        <LoginScreen getUserData={ this.getUserData } /> 

        }

      </div>
    );
  }
}

export default App;
