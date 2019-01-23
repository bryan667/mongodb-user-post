import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import ReactLoading from 'react-loading';

import {uploadImage, deleteImage} from '../../redux/actions/image_actions'
import {editUser} from '../../redux/actions/user_actions'
import {previewFile, removeImage, reset} from '../ui/misc'
import UserImage from '../ui/user_image'

class ImageUp extends Component {

    state = {
        loading: false,
        disabled: true,
        image:{
            isUploading:false,
            file: '',
            previewResult: '',
            error: '',
        },
    }

    submitImage() {
        const tempImage = this.state.image
        const dataToSubmit = this.props.userData
        const imageID = this.props.userData.imageID

        this.setState({
            loading: true,
            disabled: true,
        })

        this.props.dispatch(uploadImage(tempImage.file)).then(res => {
            if (res.payload.success) {
                dataToSubmit.imageID = res.payload.imageID
                if (imageID) {
                    this.props.dispatch(deleteImage(imageID))
                }
                this.props.dispatch(editUser(dataToSubmit)).then(res => {
                    reset(tempImage, (tempImage)=> {
                        this.setState({
                            image: tempImage,
                            loading: false,
                        })
                    })
                    this.props.close()
                })
            }
        })
    }

    clickUpload = () => {
        document.getElementById('inputProfile').click()
    }

    previewFile = (event) => {
        const tempImage = this.state.image
        this.setState({disabled: false})

        previewFile(event, tempImage, (tempImage) => {
            this.setState({
                image: tempImage
            })
        })
    }

    uploadAgain = () => {
        const tempImage = this.state.image
        this.setState({disabled: true})

        removeImage(tempImage, (tempImage)=> {
            this.setState({
                image: tempImage
            })
        })

        reset(tempImage, (tempImage)=> {
            this.setState({
                image: tempImage
            })
        })
    }

    closeMe = () => {
        const tempImage = this.state.image
        this.props.close()

        reset(tempImage, (tempImage)=> {
            this.setState({
                image: tempImage
            })
        })
    }

    render() {
        const {image} = this.state
        return (
            <Modal show={this.props.show} onHide={()=> this.closeMe()}>
                <Modal.Header>
                    Change Profile Pic
                </Modal.Header>
                <Modal.Body>
                    {!image.previewResult ?
                        <React.Fragment>
                            <div className='imageup_wrapper'>
                                <div className='imageup_wrapper2'
                                    onClick={()=> this.clickUpload()}>
                                    <UserImage 
                                        imageID={this.props.userData.imageID}
                                    />
                                <span className="plus">+</span>
                                </div>
                            </div>
                            <input id='inputProfile' type="file"
                                onChange={(e)=> this.previewFile(e)}
                                accept='image/*'
                                style={{display: 'none'}}
                            ></input>
                        </React.Fragment>
                    :null
                    }
                    {image.previewResult ?
                        <div className='imageup_wrapper'>
                            <div className="image_upload_wrapper">
                                <div className='imageup_wrapper2'>
                                    <div
                                        className='img2'
                                        style={{backgroundImage: `url(${image.previewResult})`}}                                    
                                    ></div>
                                </div>
                                <Button className="remove" 
                                    onClick={()=>this.uploadAgain()}
                                    bsStyle="primary"
                                >Remove</Button>
                            </div>
                        </div>
                    :null
                    }
                    {this.state.loading ?
                        <ReactLoading 
                        className='spinner'
                        type={'spin'} 
                        color={'blue'} 
                        height={'10%'} 
                        width={'10%'} />
                        : null
                    }
                    {image.error ?
                        <div className='error_label'>{image.error}</div>
                        : null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=> this.closeMe()}>Cancel</Button>
                    <Button bsStyle="primary"
                            onClick={() => this.submitImage()}
                            disabled={this.state.disabled}
                    >{'Change' }</Button>
                </Modal.Footer>
            </Modal>
        )
    }
};

export default connect()(ImageUp);