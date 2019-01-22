import React, { Component } from 'react'

class UserImage extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.imageID ?
                <img src={`/api/images/imageid?id=${this.props.imageID}`}
                alt='wowe'
                className='img'
                ></img>
                :
                <img src={`/images/image_not_available.jpg`}
                    alt='wowe'
                    className='img'
                ></img>
                }
            </React.Fragment>
        )
    }
}

export default UserImage;