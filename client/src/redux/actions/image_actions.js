import axios from 'axios'
import { IMAGES_SERVER } from '../../server_routes'
import { GET_IMAGE } from './type'

export function getImage(id) {
    const request = axios.get(`${IMAGES_SERVER}/imageid?id=${id}`)
        .then(response => response.data)

        return {
            type: GET_IMAGE,
            payload: request
        }
}