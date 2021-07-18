import * as ActionTypes from './ActionTypes';

export const Auth = (state = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    errMsg: null
}, action) => {
    switch(action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {...state, isLoading:true, isAuthenticated:false};

        case ActionTypes.LOGIN_SUCCESS:
            return {...state, isLoading:false, isAuthenticated: true, errMsg:'', user:action.user};
        
        case ActionTypes.LOGOUT_FAILURE:
            return {...state, isAuthenticated:false, errMsg:action.message};
        
        case ActionTypes.LOGOUT_REQUEST:
            return {...state, isLoading:true, isAuthenticated: true};

        case ActionTypes.LOGOUT_SUCCESS:
            return {...state, isLoading:false, isAuthenticated:false, token:'', user:null};

        default:
            return state
    }
}