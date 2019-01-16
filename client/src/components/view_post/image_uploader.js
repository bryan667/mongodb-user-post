import React, { Component } from 'react'
import ReactLoading from 'react-loading'

class ImageUploader extends Component {

    state = {
        isUploading:false,
    }

    handleUploadStart = () => {
        this.setState({
            isUploading:true
        })
    }

    handleUploadError = () => {
        this.setState({
            isUploading:false
        })
     }

    handleUploadSuccess = (filename) => {

    }
    
    reset = () => {
        this.setState({
            name:'',
            isUploading:false,
            fileURL:''
        });
    }

    uploadAgain = () => {
        this.reset()
        this.props.removeImage()
    }

    render() {
        return (
            <div>
                { !this.props.url ?
                    <div className='image_up'>
                        <div>{this.props.tag}</div>
                    </div>
                    :null
                }
                { this.state.isUploading ?
                    <div>
                        <ReactLoading 
                        className='spinner'
                        type={'spin'} 
                        color={'blue'} 
                        height={'10%'} 
                        width={'10%'} />
                    </div> 
                :null
                }
                { this.props.url ?
                    <div className='image_preview'>
                        <div className="image_upload_wrapper">
                            <img
                                src={this.props.url}
                                alt={this.props.fileName}
                            />
                            <div className="remove" onClick={()=>this.uploadAgain()}>
                                Remove
                            </div>
                        </div>
                    </div>
                :null
                }
            </div>
        );
    }
}

export default ImageUploader;