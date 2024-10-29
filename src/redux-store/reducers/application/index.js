const reducer = (state = { inited: false }, action) => {
    let newState = { ...state };
    switch (action.type) {
        case 'APPLICATION_UPDATE_DATA':
            let data = action.data || {};
            return { ...newState, ...data };
        default:
            return state
    }
}
export default reducer
