import * as ActionTypes from './ActionTypes';

export const Models = (state = {
    isLoading: true,
    errMsg: null,
    models:[]
}, action) =>{
    switch(action.type) {
        case ActionTypes.ADD_MODELS:
            return {...state, isLoading:false, errMsg:null, models:action.payload};

        case ActionTypes.MODELS_LOADING:
            return {...state, isLoading:true, errMsg:null, models:[]};

        case ActionTypes.MODELS_FAILED:
            return {...state, isLoading:false, errMsg:action.payload};

        case ActionTypes.ADD_MODEL:
            var model = action.payload;
            console.log("Model: "+model);
            return {...state, models:state.models.concat(model)};
            
        default:
            return state;
    }
};