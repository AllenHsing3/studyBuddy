import { LOAD_ALL_CATEGORIES_SUCCESS, LOAD_ALL_CATEGORIES_FAIL } from "../actions/types";

const initialState = {
    loading:true,
    categories: []
}

export default function(state = initialState, action){
    const{type, payload} = action
    switch (type) {
        case LOAD_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
                loading: false
                
    }
        case LOAD_ALL_CATEGORIES_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}