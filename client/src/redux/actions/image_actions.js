import axios from 'axios'
import { IMAGES_SERVER } from '../../server_routes'
import { UPLOAD_IMAGE } from './type'

export function uploadImage(imgData) {
    const request = axios.post(`${IMAGES_SERVER}/upload`, imgData)
        .then(response => response.data)

        return {
            type: UPLOAD_IMAGE,
            payload: request
        }
}