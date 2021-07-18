import * as ActionTypes from './ActionTypes';

export const Stars = (state = {
    isLoading: true,
    errMsg: null,
    stars: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_STARS:
            return {...state, isLoading:false, errMsg:null, stars:action.payload};

        case ActionTypes.STARS_LOADING:
            return {...state, isLoading:true, errMsg:null, stars:[]};
        
        case ActionTypes.STARS_FAILED:
            return {...state, isLoading:false, errMsg:action.payload};
        
        case ActionTypes.ADD_STAR:
            var star = action.payload;
            console.log("Star:"+star);
            return {...state, stars:state.stars.concat(star)};

        default:
            return state;
    }
};