import React from 'react';
import '../App.css';
import { IconContext } from "react-icons";
import { FaUser } from 'react-icons/fa';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         
        }

    }

    render() {
        return(
            <div className="header">
                <div className="headerLogoContainer">
                    <img src="http://lanlogic.com/wordpress/wp-content/uploads/2015/02/sample-logo.png" 
                        className="headerLogo" 
                        height="60px"
                        width="60px"
                        alt='' />
                    <p className="headerLogoText">Gate Watcher</p>
                </div>

                { this.props.authId === 1 ?
                    <p className="headerCustomer">Master User</p> :
                    <p className="headerCustomer">{ this.props.customerName }</p>
                }
                
                <div className="userInfo">   
                    <button 
                            // onClick={ () => alert('user settings clicked') }
                            className="userButton"
                            title="user profile" >
                        <IconContext.Provider value={{ color: "black"}}>
                            <FaUser style={{ height: '90%', width: '90%' }} />
                        </IconContext.Provider>
                    </button>
                    <p className="headerUser">{ this.props.fullName }</p>
                    <button onClick={ () => this.props.doLogout() }
                            className="logoutButton" >
                        Logout
                    </button>
                </div>
            </div>
        )
    }
}

export default Header;
