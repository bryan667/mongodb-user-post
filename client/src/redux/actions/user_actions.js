import axios from 'axios'
import { USERS_SERVER } from '../../server_routes'
import { LOGIN_USER, AUTH_USER, LOGOUT_USER, REGISTER_USER, EDIT_USER} from './type'

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

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USERS_SERVER}/login`, dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post(`${USERS_SERVER}/register`, dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function editUser(dataToSubmit) {
    const request = axios.post(`${USERS_SERVER}/edituser`, dataToSubmit)
        .then(response => response.data)

    return {
        type: EDIT_USER,
        payload: request
    }
}