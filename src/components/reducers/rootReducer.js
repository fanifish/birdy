import initialState from "./initialState"
import teamsReducer from "./slices/teamsSlice"
import viewReducer from "./slices/viewSlice"
import ballReducer from "./slices/ballSlice"
import videoReducer from "./slices/videoSlice"

// Use the initialState as a default value
export default function rootReducer(state = initialState, action) {
    return {
        teams: teamsReducer(state.teams, action),
        view: viewReducer(state.view, action),
        ballState: ballReducer(state.ballState, action),
        videoPlayer: videoReducer(state.videoPlayer, action)
    }
}
