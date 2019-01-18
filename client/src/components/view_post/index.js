import React, { Component } from 'react';
import {Button, Glyphicon } from 'react-bootstrap'
import ReactLoading from 'react-loading'
import {connect} from 'react-redux'

import {validateFunction, showError, convertArray, reverseArray} from '../ui/misc'
import {postDocs} from '../../redux/actions/post_action'
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
        reload: false,
        postsLoading: true,
        previousLength: 0,
        posts: [],
        image:{
            fileName: '',
            url: '',
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
        this.props.dispatch(postDocs(5)).then(res => {
            console.log(res)
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
        tempElement.id = post.id
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
 
    }

    savePost = () => {
        const tempElement = {...this.state.editModal}
        this.errorCheck(tempElement)
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
            
            this.props.dispatch(postDocs(2, this.state.previousLength)).then(res => {
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
    }

    updateForm = (event) => {
        const tempElement = this.state[event.target.id]
        tempElement.value = event.target.value
        this.errorCheck(tempElement)
    }

    submitPost =()=> {
        const tempState = {...this.state}
        this.errorCheck(tempState.textarea1)

        if (this.state.formError === false) {
            const date = new Date().toUTCString()

            const dataToSubmit = {
                fullName: `${tempState.userData.firstName} ${tempState.userData.lastName}`,
                email: tempState.userData.email,
                post: tempState.textarea1.value,
                timeStamp: date,
                imageURL: tempState.image.url
            }

            ///

            tempState.image.fileName = ''
            tempState.image.url = ''
            tempState.textarea1.value = ''

            this.setState({
                image: tempState.image,
                textarea1: tempState.textarea1,
                disabled: true,
                reload: true,
            })

            setTimeout(()=> {
                this.setState({
                    reload: false
                })
            }, 0)

            setTimeout(()=> {
                this.setState({
                    disabled: false
                })
            }, 1500)
        }
    }

    storeFilename(imageFilename, imageURL) {
        const imageData = {...this.state.image}
        imageData.fileName = imageFilename
        imageData.url = imageURL

        this.setState({image: imageData})
    }

    removeImage = () => {
        ////
        
        const imageData = {...this.state.image}
        imageData.fileName = ''
        imageData.url = ''

        this.setState({image: imageData})
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

    mapPosts = (posts) => (
        posts ?
            posts.map((items, i)=>(
                <div key={i}>
                    <div className='posts_div'>
                        <div className='user_detail'>
                            {!this.state.reload ? 
                                <div className='img_profile'>
                                    <UserImage 
                                        imageID={items.userInfo.imageID}
                                    />
                                </div>
                            :
                            <div className='img_profile'>
                                <div className='spinner_wrap'>
                                    <ReactLoading 
                                    className='spinner'
                                    type={'spin'} 
                                    color={'blue'} 
                                    height={'10%'} 
                                    width={'10%'} />
                                </div>
                            </div>
                            }
                            <div className='right'>
                                <h2 className='full_name'>{`${items.userInfo.firstname} ${items.userInfo.lastname}(${items.userInfo.email})`}</h2>
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
                        {items.imageURL ? 
                            <div className='img_post_wrapper'>
                                <img src={items.imageURL}
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
                {console.log('posts:', this.props)}
                {console.log('post_state:', this.state)}
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
                            fileName={this.state.image.fileName}
                            url={this.state.image.url}
                            passFile={(filename, url)=> this.storeFilename(filename, url)}
                            removeImage={()=> this.removeImage()}
                            reset={()=> this.reset()}
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