import React, { Component } from 'react';
import ReactLoading from 'react-loading'
import {convertArray} from '../ui/misc'

class UserImage extends Component {

    state = {
        imageURL: ''
    }

    componentDidMount(){
        ////
    }

    render() {
        return (
            <React.Fragment>
            {this.state.imageURL ?
                <div className='img_profile'>
                    <img src={this.state.imageURL}
                        alt='wowe'
                        className='img'
                    ></img>
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
            </React.Fragment>
        );
    }
}

export default UserImage;