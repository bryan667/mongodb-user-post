import axios from 'axios'
import { IMAGES_SERVER } from '../../server_routes'
import { UPLOAD_IMAGE, DELETE_IMAGE } from './type'

export function uploadImage(imgFile) {
    const bodyFormData = new FormData()
    bodyFormData.append('inputFile', imgFile)

    const request = axios.post(`${IMAGES_SERVER}/upload`, bodyFormData)
        .then(response => response.data)

        return {
            type: UPLOAD_IMAGE,
            payload: request
        }
}

export function deleteImage(imageID) {
    const request = axios.get(`${IMAGES_SERVER}/removeimage?id=${imageID}`)
        .then(response => response.data)

        return {
            type: DELETE_IMAGE,
            payload: request
        }
}