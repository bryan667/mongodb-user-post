import { GET_IMAGE } from '../actions/type'

export default function (state={},action) {
    switch(action.type) {
        case GET_IMAGE:
            return { ...state, imageData: action.payload }
        default:
            return state
    }
} 