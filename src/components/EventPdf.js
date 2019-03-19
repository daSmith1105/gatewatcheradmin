import React from 'react';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../App.css';

const apiURL = 'http://192.168.0.144:8000/';

class EventPdf extends React.Component {

    constructor(props) {
        super(props);

        this.printDocument = this.printDocument.bind(this);
    }

        printDocument() {
            const input = document.getElementById('divToPrint');
            const lpnImage = document.getElementById('lpn');
            const loadImage = document.getElementById('load');
            html2canvas(input, lpnImage, loadImage)
                .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(lpnImage, 'PNG', 20,20, 20,20)
                pdf.addImage(lpnImage, 'PNG', 80,80,20,20)
                // pdf.addImage(imgData, 'PNG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
                })
            
        }

    render() {
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
            sComment } = this.props.pdfData.pdfData;

        return (   
      
                <div className="pdfEventContainer" id="divToPrint" > 
                <div onClick={ this.printDocument } style={{ marginTop: 20, padding: 1, backgroundColor: 'blue', color: 'white', width: '10%'  }}>Print</div>
                <h1 style={{ textAlign: 'left', marginLeft: 20 }}>Gate Watcher</h1>
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
                <div className="pdfImageContainer" id="images" >
                        <p className="pdfImageLabel">Lic Plate Image</p>
                        <p className="pdfImageLabel">Load Image</p>
                        <img className="pdfPhotoLpn"
                            id="lpn"
                            src={ apiURL + sLpnPhoto.slice(8) }
                            height="40%"
                            width="50%"
                            alt=''
                            />
                        <img className="pdfPhotoLoad"
                            id="load"
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
}

export default EventPdf;