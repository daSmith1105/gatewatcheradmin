import React from 'react';
import { IconContext } from "react-icons";
import { FaWindowClose, FaEnvelope, FaSave } from 'react-icons/fa';
import '../App.css';


class ImageModal extends React.Component{
    constructor(props) {
        super(props);

        this.fetchImage = this.fetchImage.bind(this)
    }

  fetchImage(){
       
        fetch( 'http://192.168.0.144:8000/api/download' )
        .then(res => console.log(res.body))
        .then( data => console.log(data))
        .catch(err => console.log('Error: ', err))
    }

    render() {

        const apiURL = 'http://192.168.0.144:8000/';

        return (
        
            <div className="imageModalOverlay">
                <div className="imageModalContainer">
                    <div className="previewImage">
                        <img className="image"
                            src={ apiURL + this.props.imageURI }
                            alt={ '' } 
                            />
                        <IconContext.Provider value={{ color: "white", className: "closeImagePreview" }}>
                                <FaWindowClose style={{ height: '4%', width: '4%' }} 
                                            onClick={ this.props.closeImageModal } />
                        
                        </IconContext.Provider>
                        <IconContext.Provider value={{ color: "white", className: "imageEmail" }}>
                                <FaEnvelope style={{ height: '4%', width: '4%' }} />
                        
                        </IconContext.Provider>
                            {/* <div onClick={ () => this.fetchImage() }> */}
                                <a href={ apiURL + this.props.imageURI } download >
                                <IconContext.Provider value={{ color: "white", className: "imageSave" }}>
                                        <FaSave style={{ height: '4%', width: '4%' }} />
                                </IconContext.Provider>
                                </a>
                            {/* </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageModal;