import axios from 'axios'
import { POSTS_SERVER } from '../../server_routes'
import { GET_POSTS } from './type'


export function postDocs(limit,skip=0) {
    const request = axios.get(`${POSTS_SERVER}/docs?sortBy=_id&order=desc&limit=${limit}&skip=${skip}`)
        .then(response => response.data)

    return {
        type: GET_POSTS,
        payload: request
    }
}