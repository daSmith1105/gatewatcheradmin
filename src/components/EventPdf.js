import React from 'react';
import moment from 'moment';
import '../App.css';

const EventPdf = (props) => {

    const { 
        GateUser, 
        createdAt,
        GateCustomer, 
        GateType,
        Gate,
        GateCompany, 
        GatePerson, 
        GateLPN,
        sLpnPhoto,
        sLoadPhoto,
        sComment } = props.pdfData.pdfData;

    const apiURL = 'http://192.168.0.144:8000/';
    return (    
        <div className="pdfEventContainer"> 
            <div className="pdfInfoContainer">
                <p>Date: { moment(createdAt).format('MM/DD/YY hh:mm a') }</p>
                <p>Customer: { GateCustomer.sName }</p>
                <p>Logged By: { GateUser.sFirstName + ' ' +  GateUser.sLastName }</p>
                <p>Event Type: { GateType.sName }</p>
                <p>Gate: { Gate.sName }</p>
                <p>Company: { GateCompany.sName }</p>
                <p>Driver: { GatePerson.sFirstName + ' ' + GatePerson.sLastName}</p>
                <p>Passengers: N/A</p>
                <p>LPN: { GateLPN.sLPN }</p>
            </div>
            <div className="pdfImageContainer">
                    <p className="pdfImageLabel">Lic Plate Image</p>
                    <p className="pdfImageLabel">Load Image</p>
                    <img className="pdfPhotoLpn"
                        src={ apiURL + sLpnPhoto.slice(8) }
                        height="40%"
                        width="50%"
                        alt=''
                        />
                    <img className="pdfPhotoLoad"
                        src={ apiURL + sLoadPhoto.slice(8) }
                        height="40%"
                        width="50%"
                        alt=''
                        />
        
            </div>

            <div className="pdfComments">
            <p>Comments:</p>
                <p>{ sComment } </p>
            </div>
        </div>
    )
}

export default EventPdf;