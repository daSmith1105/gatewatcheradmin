import React from 'react';
import CustomerControl from '../components/CustomerControl';
import CompanyControl from '../components/CompanyControl';
import GateControl from '../components/GateControl';
import LpnControl from '../components/LpnControl';
import EventControl from '../components/EventControl';
import UserControl from '../components/UserControl';
import PersonControl from '../components/PersonControl';
import GateAssignmentControl from '../components/GateAssignmentControl';
import '../App.css';

class AdminScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div className="adminScreen">
                <div className="adminScreenContainer">
                    { this.props.showCustomerControl ?
                        <div>
                            <CustomerControl customers={ this.props.customers }
                                             closeAdminControl={this.props.closeAdminControl }
                                             refreshTable={ this.props.refreshTable }
                                             getAllCustomers={ this.props.getAllCustomers }
                                             isMaster={ this.props.isMaster } /> 
                        </div> :
                        null
                    }
                    { this.props.showCompanyControl ?
                        <div>
                            <CompanyControl  companies={ this.props.companies }
                                             customers={ this.props.customers }
                                             customerId={ this.props.customerId }
                                             customerName={ this.props.customerName }
                                             closeAdminControl={ this.props.closeAdminControl }
                                             getAllCompanies={ this.props.getAllCompanies }
                                             getAllCompaniesByCustomer={ this.props.getAllCompaniesByCustomer }
                                             isMaster={ this.props.isMaster }
                                             isAdmin={ this.props.isAdmin } /> 
                        </div> :
                        null
                    }
                    { this.props.showGateControl ?
                        <div>
                            <GateControl  gates={ this.props.gates }
                                          customers={ this.props.customers }
                                          customerId={ this.props.customerId }
                                          customerName={ this.props.customerName }
                                          closeAdminControl={ this.props.closeAdminControl }
                                          getAllGates={ this.props.getAllGates }
                                          getAllGatesByCustomer={ this.props.getAllGatesByCustomer }
                                          isMaster={ this.props.isMaster }
                                          isAdmin={ this.props.isAdmin } /> 
                        </div> :
                        null
                    }
                    { this.props.showLpnControl ?
                        <div>
                            <LpnControl   lpns={ this.props.lpns }
                                          customers={ this.props.customers }
                                          people={ this.props.people }
                                          companies={ this.props.companies }
                                          customerId={ this.props.customerId }
                                          customerName={ this.props.customerName }
                                          closeAdminControl={ this.props.closeAdminControl }
                                          getAllLpns={ this.props.getAllLpns }
                                          getAllLpnsByCustomer={ this.props.getAllLpnsByCustomer }
                                          isMaster={ this.props.isMaster }
                                          isAdmin={ this.props.isAdmin } /> 
                        </div> :
                        null
                    }
                    { this.props.showEventControl ?
                        <div>
                            <EventControl   events={ this.props.events }
                                            users={ this.props.users }
                                            customers={ this.props.customers }
                                            people={ this.props.people }
                                            companies={ this.props.companies }
                                            authTypes={ this.props.authTypes }
                                            groups={ this.props.groups }
                                            lpns={ this.props.lpns }
                                            gates={ this.props.gates }
                                            eventTypes={ this.props.eventTypes }
                                            customerId={ this.props.customerId }
                                            customerName={ this.props.customerName }
                                            closeAdminControl={ this.props.closeAdminControl }
                                            getAllEvents={ this.props.getAllEvents }
                                            getAllEventsByCustomer={ this.props.getAllEventsByCustomer }
                                            getAllEventsByGate={ this.props.getAllEventsByGate }
                                            userId={ this.props.userId }
                                            fullName={ this.props.fullName }
                                            assignedGate={ this.props.assignedGate }
                                            assignedGateName={ this.props.assignedGateName }
                                            isMaster={ this.props.isMaster }
                                            isAdmin={ this.props.isAdmin }
                                            isGuard={ this.props.isGuard } /> 
                        </div> :
                        null
                    }
                    { this.props.showUserControl ?
                        <div>
                            <UserControl   users={ this.props.users }
                                           customers={ this.props.customers }
                                           authTypes={ this.props.authTypes }
                                           customerId={ this.props.customerId }
                                           customerName={ this.props.customerName }
                                           closeAdminControl={ this.props.closeAdminControl }
                                           getAllUsers={ this.props.getAllUsers }
                                           getAllUsersByCustomer={ this.props.getAllUsersByCustomer }
                                           isMaster={ this.props.isMaster }
                                           isAdmin={ this.props.isAdmin } /> 
                        </div> :
                        null
                    }
                    { this.props.showPersonControl ?
                        <div>
                            <PersonControl   people={ this.props.people }
                                             customers={ this.props.customers }
                                             companies={ this.props.companies }
                                             groups={ this.props.groups }
                                             lpns={ this.props.lpns }
                                             customerId={ this.props.customerId }
                                             customerName={ this.props.customerName }
                                             closeAdminControl={ this.props.closeAdminControl }
                                             getAllPeople={ this.props.getAllPeople }
                                             getAllPeopleByCustomer={ this.props.getAllPeopleByCustomer }
                                             isMaster={ this.props.isMaster }
                                             isAdmin={ this.props.isAdmin } /> 
                        </div> :
                        null
                    }
                    { this.props.showGateAssignmentControl ?
                        <div>
                            <GateAssignmentControl  gateAssignments={ this.props.gateAssignments }
                                                    customers={ this.props.customers }
                                                    gates={ this.props.gates }
                                                    guards={ this.props.guards }
                                                    userId={ this.props.userId }
                                                    customerId={ this.props.customerId }
                                                    customerName={ this.props.customerName }
                                                    closeAdminControl={ this.props.closeAdminControl }
                                                    getAllGuards={ this.props.getAllGuards }
                                                    getAllGateAssignments={ this.props.getAllGateAssignments }
                                                    getAllGuardsByCustomer={ this.props.getAllGuardsByCustomer }
                                                    getAllGateAssignmentsByCustomer={ this.props.getAllGateAssignmentsByCustomer }
                                                    toggleControl={ this.props.toggleControl }
                                                    isMaster={ this.props.isMaster }
                                                    isAdmin={ this.props.isAdmin } /> 
                        </div> :
                        null
                    }
                </div>
            </div>
        )
    }            
}

export default AdminScreen;

