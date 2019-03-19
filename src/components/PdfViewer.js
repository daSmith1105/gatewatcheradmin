import React from 'react';
import { IconContext } from "react-icons";
import { FaWindowClose, FaEnvelope, FaSave } from 'react-icons/fa';
import EventPdf from './EventPdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../App.css';


class PdfViewer extends React.Component {
    constructor(props) {
        super(props);

        this.printDocument = this.printDocument.bind(this);
    }

            // <div>
            //   <div className="mb5">
            //     <button onClick={this.printDocument}>Print</button>
            //   </div>
            //   <div  id="divToPrint" className="mt4" style={{ backgroundColor: '#f5f5f5',
            //         width: '210mm',
            //         minHeight: '297mm',
            //         marginLeft: 'auto',
            //         marginRight: 'auto'}}>
            //     <LpnControl />
            //     <div>Note: Here the dimensions of div are same as A4</div> 
            //     <div>You Can add any component here</div>
            //   </div>
            // </div>

    printDocument() {
        alert('printing')
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.output('dataurlnewwindow');
            pdf.save("download.pdf");
            })
        
    }

    render() {

        return (
                <div className="pdfViewerOverlay">
                    <div className="pdfViewerContainer" style={{ backgroundColor: '#f5f5f5',
                            width: '210mm',
                            minHeight: '297mm',
                            marginLeft: 'auto',
                            marginRight: 'auto'}}> 
                        <div>
                            <EventPdf pdfData={ this.props }/>
                        </div>
                        <IconContext.Provider value={{ color: "black", className: "closePdfViewer" }}>
                                <FaWindowClose style={{ height: '4%', width: '4%' }} 
                                            onClick={ this.props.closePdfViewer } />
                        
                        </IconContext.Provider>
                        <IconContext.Provider value={{ color: "black", className: "pdfViewerEmail" }}>
                                <FaEnvelope style={{ height: '4%', width: '4%' }} 
                                            onClick={this.printDocument.bind(this)}/>
                        
                        </IconContext.Provider>
                            <IconContext.Provider value={{ color: "blue", className: "pdfViewerSave" }}>
                                    <FaSave style={{ height: '4%', width: '4%' }}
                                            onClick={this.printDocument.bind(this)} />
                            </IconContext.Provider>
                </div>
            
            </div>
        )
    }
}

export default PdfViewer;