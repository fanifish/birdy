import initialState from "../initialState"

/**
 * Reducer handling video state 
*/
export default function videoReducer(state = initialState.videPlayer, action) {
    switch (action.type) {
        case 'player/UpdateTime':
            return {
                ...state,
                currentTime: action.payload
            }
        default:
            return state
    }
}