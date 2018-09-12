import {actionTypes} from '../common';

export default (state = {
    imageAsset: {},
    videoAsset: {},
    modelAsset: {},
}, action) => {
    switch (action.type) {
        case actionTypes.ADD_IMAGE_ASSET:
            return {...state, imageAsset: {status: action.status, message: action.message}};
        case actionTypes.ADD_VIDEO_ASSET:
            return {...state, videoAsset: {status: action.status, message: action.message}};
        case actionTypes.ADD_MODEL_ASSET:
            return {...state, modelAsset: {status: action.status, message: action.message}};
        default:
            return state
    }
};