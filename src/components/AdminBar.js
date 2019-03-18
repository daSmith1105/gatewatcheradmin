import React from 'react';
import '../App.css';
import { IconContext } from "react-icons";
import { FaUserShield, 
         FaCogs, 
         FaAddressCard, 
         FaTruck, 
         FaTimes, 
         FaUsersCog, 
         FaMapSigns } from 'react-icons/fa';

class AdminBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         barOpen: false
        }

        this.toggleBar = this.toggleBar.bind(this);
    }

    toggleBar() {
        this.setState({ 
            barOpen: !this.state.barOpen 
        }, () => {
            if( !this.state.barOpen ) {
                this.props.closeAdminControl();
            }
        })
    }

    render() {

        return(
            <div className={ this.state.barOpen ? "adminBarOpen" : "adminBarClosed" } >

                { !this.state.barOpen ? 
                    <button className="adminBarToggleButtonOpenContainer" onClick={ this.toggleBar }>
                        <IconContext.Provider value={{ color: "lightblue"}}>
                            <FaCogs style={{ height: '80%', width: '80%' }} />
                        </IconContext.Provider>
                    </button> :
                    <button className="adminBarToggleButtonCloseContainer" onClick={ this.toggleBar }>
                        <IconContext.Provider value={{ color: "lightblue"}}>
                            <FaTimes style={{ height: '80%', width: '80%' }} />
                        </IconContext.Provider>
                    </button>
                } 
              
                <div className="adminButtonContainer">
                    { this.props.isMaster ?
                    <div className="adminButtonWrapper">
                        <button onClick={ () => this.props.toggleControl('customerControl') }
                                className={ this.props.showCustomerControl ? "adminButtonActive" : "adminButton" } >
                              <IconContext.Provider value={{ color: "black"}} >
                                <FaUsersCog style={{ height: '62%', width: '62%' }} />
                            </IconContext.Provider>
                            <p className="adminButtonText">Customers</p>
                        </button>
                    </div> :
                    null
                    }
                    <div className="adminButtonWrapper">
                        <button onClick={ () => this.props.toggleControl('userControl') }
                                className={ this.props.showUserControl ? "adminButtonActive" : "adminButton" } >
                            <IconContext.Provider value={{ color: "black"}} >
                                <FaUserShield style={{ height: '58%', width: '58%' }} />
                            </IconContext.Provider>
                            <p className="adminButtonText">Users</p>
                        </button>
                    </div>
                    <div className="adminButtonWrapper">
                        <button onClick={ () => this.props.toggleControl('gateControl') }
                                className={ this.props.showGateControl ? "adminButtonActive" : "adminButton" } >
                            <img src= {require('../gateicon.png')}
                                height='16px'
                                width='16px'
                                alt='' />
                            <p className="adminButtonText">Gates</p>
                        </button>
                    </div>
                    <div className="adminButtonWrapper">
                        <button onClick={ () => this.props.toggleControl('companyControl') }
                                className={ this.props.showCompanyControl ? "adminButtonActive" : "adminButton" } >
                            <IconContext.Provider value={{ color: "black"}}>
                                <FaTruck style={{ height: '55%', width: '55%' }} />
                            </IconContext.Provider>
                            <p className="adminButtonText">Companies</p>
                        </button>
                    </div>
                    <div className="adminButtonWrapper">
                        <button onClick={ () => this.props.toggleControl('personControl') }
                                className={ this.props.showPersonControl ? "adminButtonActive" : "adminButton" } >
                            <IconContext.Provider value={{ color: "black"}}>
                                <FaAddressCard style={{ height: '65%', width: '65%' }} />
                            </IconContext.Provider>
                            <p className="adminButtonText">People</p>
                        </button>
                    </div>
                    <div className="adminButtonWrapper">
                        <button onClick={ () => this.props.toggleControl('lpnControl') }
                                className={ this.props.showLpnControl ? "adminButtonActive" : "adminButton" } >
                            <img src= {require('../lpicon.png')}
                                height='20px'
                                width='20px'
                                alt='' />
                            <p className="adminButtonText">Plates</p>
                        </button>
                    </div>
                    <div className="adminButtonWrapper">
                        <button onClick={ () => this.props.toggleControl('eventControl') }
                                className={ this.props.showEventControl ? "adminButtonActive" : "adminButton" } >
                            <img src= {require('../lpicon.png')}
                                height='20px'
                                width='20px'
                                alt='' />
                            <p className="adminButtonText">Events</p>
                        </button>
                    </div>
                    <div className="adminButtonWrapper">
                        <button onClick={ () => this.props.toggleControl('gateAssignmentControl') }
                                className={ this.props.showGateAssignmentControl ? "adminButtonExtActive" : "adminButtonExt" } >
                            <IconContext.Provider value={{ color: "black"}} >
                                <FaMapSigns style={{ height: '58%', width: '58%' }} />
                            </IconContext.Provider>
                            <p className="adminButtonText">Gate Assignments</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminBar;
