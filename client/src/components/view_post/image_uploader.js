import React from 'react'
import ReactLoading from 'react-loading'

const ImageUploader =(props)=> {
    return (
        <div>
            { !props.previewResult ?
                <div className='image_up'>
                    <div>{props.tag}</div>
                    <input type="file" onChange={(e)=> props.previewFile(e)} accept='image/*' data-max-size='2048'></input>
                    {props.error ?
                        <div className='error_label'>{props.error}</div>
                        : null
                    }
                </div>
                :null
            }
            { props.isUploading ?
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
            { props.previewResult ?
                <div className='image_preview'>
                    <div className="image_upload_wrapper">
                        <img
                            src={props.previewResult}
                            alt='preview'
                        />
                        <div className="remove" onClick={()=>props.uploadAgain()}>
                            Remove
                        </div>
                    </div>
                </div>
            :null
            }
        </div>
    );
}

export default ImageUploader;