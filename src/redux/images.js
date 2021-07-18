import * as ActionTypes from './ActionTypes';

export const Images = (state = {
    errMsg: null,
    images: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_IMAGES:
            return {...state, errMsg:null, images:action.payload};
        
        case ActionTypes.IMAGES_FAILED:
            return {...state, errMsg:action.payload};
        
        case ActionTypes.ADD_IMAGE:
            var image = action.payload;
            console.log("Image: ",image);
            return {...state, images:state.images.concat(image)};
            
        default:
            return state;
    }
};
