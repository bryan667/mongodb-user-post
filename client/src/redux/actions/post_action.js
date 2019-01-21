import axios from 'axios'
import { POSTS_SERVER } from '../../server_routes'
import { GET_POSTS, NEW_POST, POST_ID, DELETE_POST } from './type'


export function getPosts(limit,skip=0) {
    const request = axios.get(`${POSTS_SERVER}/docs?sortBy=_id&order=desc&limit=${limit}&skip=${skip}`)
        .then(response => response.data)

    return {
        type: GET_POSTS,
        payload: request
    }
}

export function newPost(dataToSubmit) {
    const request = axios.post(`${POSTS_SERVER}/newpost`, dataToSubmit)
        .then(response => response.data)   

    return {
        type: NEW_POST,
        payload: request
    }
}

export function byPostID(dataToSubmit) {
    const request = axios.post(`${POSTS_SERVER}/postid`, dataToSubmit)
        .then(response => response.data) 

    return {
        type: POST_ID,
        payload: request
    }
}

export function deletePost(id) {
    const request = axios.get(`${POSTS_SERVER}/remove?id=${id}`)
        .then(response => response.data) 

    return {
        type: DELETE_POST,
        payload: request
    }
}