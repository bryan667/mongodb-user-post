import React, { Component } from 'react'

class UserImage extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.imageID ?
                <div
                    className='img'
                    style={{backgroundImage: `url(/api/images/imageid?id=${this.props.imageID})`}}                                    
                ></div>
                :
                <div
                    className='img'
                    style={{backgroundImage: `url(/images/image_not_available.jpg`}}                                    
                ></div>
                }
            </React.Fragment>
        )
    }
}

export default UserImage;