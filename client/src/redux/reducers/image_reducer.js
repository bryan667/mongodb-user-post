import { UPLOAD_IMAGE } from '../actions/type'

export default function image(state={},action) {
    switch(action.type) {
        case UPLOAD_IMAGE:
            return { ...state, imageData: action.payload }
        default:
            return state
    }
} 