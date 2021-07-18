import * as ActionTypes from './ActionTypes';

export const Videos = (state = {
    errMsg: null,
    videos: [],
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_VIDEOS:
            return {...state, errMsg:null, videos:action.payload};

        case ActionTypes.VIDEOS_FAILED:
            return {...state, errMsg:action.payload};

        case ActionTypes.ADD_VIDEO:
            var video = action.payload;
            console.log("Video: "+video);
            return {...state, videos:state.videos.concat(video)}
            
        default:
            return state;
    }
};