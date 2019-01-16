import axios from 'axios'
import { USERS_SERVER } from '../../server_routes'
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from './type'


export function auth() {
    const request = axios.get(`${USERS_SERVER}/auth`)
        .then(response => response.data)

        return {
            type: AUTH_USER,
            payload: request
        }
}

export function logoutUser() {
    const request = axios.get(`${USERS_SERVER}/logout`)
        .then(response => response.data)

        return {
            type: LOGOUT_USER,
            payload: request
        }
}