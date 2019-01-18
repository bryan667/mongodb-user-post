import { combineReducers } from 'redux'
import user from './user_reducer'
import image from './image_reducer'

const rootReducer = combineReducers({
    user,
    image
})

export default rootReducer