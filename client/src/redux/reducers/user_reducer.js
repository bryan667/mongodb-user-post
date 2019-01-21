import { AUTH_USER } from '../actions/type'

export default function user(state={},action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, userData: action.payload }
        default:
            return state
    }
} 