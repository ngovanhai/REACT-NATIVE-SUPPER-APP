
const reducer = (state = {}, action) => {
	let newState = { ...state }
	switch (action.type) {
		case 'AUTH_REFRESH_TOKEN':
			return newState;
		case 'AUTH_UPDATE_DATA':
			return { ...newState, ...action.data || {} }
		default:
			return state
	}

}
export default reducer
