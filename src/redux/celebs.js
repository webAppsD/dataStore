import * as ActionTypes from './ActionTypes';

export const Celebs = (state = {
    isLoading: true,
    errMsg: null,
    celebs:[]
}, action) => {
    switch(action.type) {
        case ActionTypes.CELEBS_LOADING:
            return {...state, isLoading:true, errMsg:null, celebs:[]};
        
        case ActionTypes.CELEBS_FAILED:
            return {...state, isLoading:false, errMsg:action.payload};

        case ActionTypes.ADD_CELEBS:
            return {...state, isLoading:false, errMsg:null, celebs:action.payload};

        case ActionTypes.ADD_CELEB:
            var celeb = action.payload;
            console.log('Celeb: '+celeb);
            return {...state, celebs:state.celebs.concat(celeb)};
            
        default:
            return state;
    }
};