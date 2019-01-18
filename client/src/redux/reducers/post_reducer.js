import { GET_POSTS } from '../actions/type'

export default function post(state={},action) {
    switch(action.type) {
        case GET_POSTS:
            return { ...state, postData: action.payload }
        default:
            return state
    }
} 