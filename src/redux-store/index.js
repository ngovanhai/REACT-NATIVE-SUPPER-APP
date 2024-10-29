import { combineReducers } from 'redux'
import auth from '@reducers/auth'
import application from '@reducers/application'

export default combineReducers({
	auth,
	application,
})