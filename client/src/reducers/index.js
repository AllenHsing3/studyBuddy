import {combineReducers} from 'redux'
import auth from './auth'
import alert from './alert'
import category from './category'
import study from './study'

export default combineReducers({auth, alert, category, study})