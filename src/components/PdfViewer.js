import React from 'react';
import { IconContext } from "react-icons";
import { FaWindowClose, FaEnvelope, FaSave } from 'react-icons/fa';
import EventPdf from './EventPdf';
import '../App.css';

const PdfViewer = (props) => {
    const apiURL = 'http://192.168.0.144:8000/';

    return (
        <div className="pdfViewerOverlay">
            <div className="pdfViewerContainer"> 
                    <h1 style={{ textAlign: 'left', marginLeft: 20 }}>Gate Watcher</h1>
                    <EventPdf pdfData={ props } />
                    <IconContext.Provider value={{ color: "black", className: "closePdfViewer" }}>
                            <FaWindowClose style={{ height: '4%', width: '4%' }} 
                                           onClick={ props.closePdfViewer } />
                    
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: "black", className: "pdfViewerEmail" }}>
                            <FaEnvelope style={{ height: '4%', width: '4%' }} />
                    
                    </IconContext.Provider>
                    <a href={ apiURL } download>
                        <IconContext.Provider value={{ color: "black", className: "pdfViewerSave" }}>
                                <FaSave style={{ height: '4%', width: '4%' }} />
                        </IconContext.Provider>
                    </a>
            </div>
        
        </div>
    )
}

export default PdfViewer;