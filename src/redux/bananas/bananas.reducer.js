import bananasTypes from "./bananas.types";

const INITIAL_STATE = {
    bananasItemsArray:[]
}

const bananasReducer =(state=INITIAL_STATE, action) => {
    switch(action.type){
        case bananasTypes.SET_BANANAS:
            return {
                ...state,
                bananasItemsArray: action.payload
            }
        case bananasTypes.ADD_BANANAS_ITEM:
            return {
                ...state,
                bananasItemsArray: action.payload
            }
        case bananasTypes.REMOVE_BANANAS_ITEM:
            return {
                ...state,
                bananasItemsArray: action.payload
            }
        case bananasTypes.RESET_BANANAS_ARRAY:
            return{
                ...state,
                bananasItemsArray: []
            }
        default:
            return state;
    }
}

export default bananasReducer;