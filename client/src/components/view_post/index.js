import React, { Component } from 'react';
import {Button, Glyphicon } from 'react-bootstrap'
import ReactLoading from 'react-loading'
import {connect} from 'react-redux'

import {validateFunction, showError, previewFile, removeImage, reset} from '../ui/misc'
import {getPosts, newPost, byPostID, deletePost} from '../../redux/actions/post_action'
import { uploadImage } from '../../redux/actions/image_actions'
import EditModal from './edit_modal'
import ImageModal from './image_modal'
import RemoveModal from './remove_modal'
import ImageUploader from './image_uploader'
import UserImage from '../ui/user_image'
import '../../css/view_post.css'

class ViewPost extends Component {

    state = {
        formError: true,
        userData: '',
        disabled: false,
        postsLoading: true,
        previousLength: 0,
        posts: [],
        image:{
            isUploading:false,
            file: '',
            previewResult: '',
            error: '',
        },
        imageModal: {
            src: '',
            display: 'none',
        },
        editModal: {
            id: '',
            value: '',
            show: false,
            index: '',
            validation: {
                required: true,
            },
            valid: false,
            validationMessage: '',
        },
        removeModal: {
            id: '',
            value: '',
            show: false,
            index: '',
        },
        textarea1: {
            value: '',
            validation: {
                required: true,
                textarea: true,
            },
            valid: false,
            validationMessage: '',
        }
    }

    static getDerivedStateFromProps(props,state) {
        return state = {
            userData: props.user.userData
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll)
        this.props.dispatch(getPosts(5)).then(res => {
            this.setState({
                posts: res.payload.docs
            })
        })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    editPost = (post, index, modalName) => {
        const tempElement = {...this.state[modalName]}
        tempElement.id = post._id
        tempElement.value = post.post        
        tempElement.index = index
        tempElement.show = true

        this.setState({
            [modalName]: tempElement
        })

        if (modalName !== 'removeModal' ) {
            this.errorCheck(tempElement)
        }
    }

    closePost = (modalName) => {
        const tempElement = {...this.state[modalName]}
        tempElement.id = ''
        tempElement.value = ''
        tempElement.index = ''
        tempElement.show = false

        this.setState({
            [modalName]: tempElement
        })
    }

    deletePost = () => {
        const tempElement = {...this.state.removeModal}
        const tempPosts = this.state.posts
        this.props.dispatch(deletePost(tempElement.id)).then((res)=> {
            if (res.payload.success === true) {
                tempElement.show = false
                tempPosts.splice(tempElement.index, 1)

                this.setState({ 
                    posts: tempPosts,
                    removeModal: tempElement,
                    reload: true
                })
            } else {
                console.log('error deleting post')
            }
        })
    }

    savePost = () => {
        const tempElement = {...this.state.editModal}
        if (this.state.formError === false) {
            this.props.dispatch(byPostID(tempElement)).then((res)=> {
                const tempPost = this.state.posts
                tempPost[tempElement.index].post = res.payload.doc.post
                this.setState({
                    posts: tempPost
                })
            })
            this.closePost('editModal')
        }
    }

    onScroll =(event)=> {
        let body = event.srcElement.body

        if (this.state.posts.length !== this.state.previousLength) {
            if (body.scrollHeight - body.scrollTop <= body.clientHeight + 5) {
                this.setState({
                    postsLoading: true,
                    previousLength: this.state.posts.length
                })
            }
            
            this.props.dispatch(getPosts(5, this.state.previousLength)).then(res => {
                const setPosts = this.state.posts
                res.payload.docs.forEach((posts)=> {
                    setPosts.push(posts)
                })
                
                this.setState({
                    posts: setPosts,
                    postsLoading: false
                })
            })
        }
    }

    errorCheck(tempElement) {
        let validateResult = validateFunction(tempElement)
        tempElement.valid = validateResult[0]
        tempElement.validationMessage = validateResult[1]

        this.setState({
            [tempElement.id]: tempElement,
            formError: !tempElement.valid
        })

        return(!tempElement.valid)
    }

    updateForm = (event) => {
        const tempElement = this.state[event.target.id]
        tempElement.value = event.target.value
        this.errorCheck(tempElement)
    }

    submitPost =()=> {
        const tempState = {...this.state}
        const errorCheck = this.errorCheck(tempState.textarea1)

        if (errorCheck === false) {
            const dataToSubmit = {
                userInfo: tempState.userData._id,
                email: tempState.userData.email,
                post: tempState.textarea1.value,
            }

            if (tempState.image.file !== '') {
                this.props.dispatch(uploadImage(tempState.image.file)).then(res => {
                    reset(tempState.image, (tempImage)=> {
                        this.setState({
                            image: tempImage
                        })
                    })
                    dataToSubmit.imageID = res.payload.imageID
                   
                    this.props.dispatch(newPost(dataToSubmit)).then(res => {
                        tempState.posts.unshift(res.payload.article)
                        this.setState({
                            posts: tempState.posts,
                        })
                    })
                })
            } else {
                this.props.dispatch(newPost(dataToSubmit)).then(res => {
                    tempState.posts.unshift(res.payload.article)
                    this.setState({
                        posts: tempState.posts,
                    })
                })
            }

            tempState.image.file = ''
            tempState.textarea1.value = ''

            this.setState({
                image: tempState.image,
                textarea1: tempState.textarea1,
                disabled: true
            })

            setTimeout(()=> {
                this.setState({
                    disabled: false
                })
            }, 1500)
        }
    }

    storeImage = (file) => {
        const tempImage = this.state.image
        tempImage.file = file

        this.setState({
            image: tempImage
        })
    }

    feedModal = (event) => {
        const tempModal = this.state.imageModal
        tempModal.src = event.target.src
        tempModal.display = 'block'
        this.setState({
            imageModal: tempModal
        })
    }

    closeModal = () => {
        const tempModal = this.state.imageModal
        tempModal.src = ''
        tempModal.display = 'none'
        this.setState({
            imageModal: tempModal
        })
    }

    uploadAgain = () => {
        const tempImage = this.state.image

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

    previewFile = (event) => {
        const tempImage = this.state.image
        previewFile(event, tempImage, (tempImage) => {
            this.setState({
                image: tempImage
            })
        })
    }

    mapPosts = (posts) => (
        posts ?
            posts.map((items, i)=>(
                <div key={i}>
                    <div className='posts_div'>
                        <div className='user_detail'>
                            <div className='img_profile'>
                                <UserImage 
                                    imageID={items.userInfo.imageID}
                                />
                            </div>
                            <div className='right'>
                                <h2 className='full_name'>{`${items.userInfo.firstname} ${items.userInfo.lastname} (${items.userInfo.email})`}</h2>
                                <div className='timestamp'>{items.createdAt}</div>
                            </div>
                            {(items.userInfo.email === this.state.userData.email) ?
                                <div className='edit_wrap'>
                                    <Button onClick={()=> this.editPost(items, i, 'editModal')}>
                                        <Glyphicon glyph="edit"/> 
                                    </Button>
                                    <Button onClick={()=> this.editPost(items, i, 'removeModal')}>
                                        <Glyphicon glyph="remove"/> 
                                    </Button>
                                </div>
                                :
                                null
                            }
                        </div>
                        <p>{items.post}</p>
                        {items.imageID ? 
                            <div className='img_post_wrapper'>
                                <img src={`/api/images/imageid?id=${items.imageID}`}
                                alt='wow much'
                                className='img_post'
                                onClick={(event) => this.feedModal(event)}
                                ></img>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            ))
        :
        null
    )

    render() {
        const { disabled, postsLoading, imageModal, editModal, removeModal} = this.state
        return (
            <div className='posts_block'>
                    <ImageModal 
                        src={imageModal.src}
                        display={imageModal.display}    
                        closeModal={()=> this.closeModal()}
                    />
                    <EditModal 
                        post={editModal}
                        onChange={(event)=> this.updateForm(event)}
                        closePost={()=> this.closePost('editModal')}
                        savePost={()=> this.savePost()}
                    />
                    <RemoveModal 
                        post={removeModal}
                        deletePost={()=> this.deletePost()}
                        closePost={()=> this.closePost('removeModal')}
                    />
                <div className='top'>
                    <form className='form_block'>
                        <ImageUploader
                            tag={"Insert Image"}
                            previewFile={(e)=> this.previewFile(e)}                            
                            uploadAgain={()=> this.uploadAgain()}
                            error={this.state.image.error}
                            previewResult={this.state.image.previewResult}
                            isUploading={this.state.image.isUploading}
                        />
                        <div className='textarea_block'>
                            <textarea
                                id='textarea1'
                                placeholder='post here'
                                value={this.state.textarea1.value}
                                onChange={(event)=> this.updateForm(event)}
                                disabled={disabled}
                            ></textarea>
                        {showError(this.state.textarea1)}
                        <div className='button_wrap'>
                            <Button bsStyle="primary" 
                                disabled={disabled}
                                onClick={() => this.submitPost()}
                            >
                                {disabled? 'Posting..' : 'Post' }
                            </Button>
                        </div>
                        </div>
                    </form>
                </div>
                <div>
                    <div className='posts_area'>
                        {this.mapPosts(this.state.posts)}
                        {postsLoading ? 
                            <div className='post_loading'>
                                <ReactLoading 
                                className='spinner'
                                type={'spin'} 
                                color={'blue'} 
                                height={'10%'} 
                                width={'10%'} />
                            </div>      
                        : null}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStatetoProps(state) {
    return {
        posts: state.post
    }
}


export default connect(mapStatetoProps)(ViewPost);