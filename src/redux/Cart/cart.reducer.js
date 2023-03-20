import cartTypes from "./cart.types";

const INITIAL_STATE = {
    cartItemsArray:[]
}

const cartReducer =(state=INITIAL_STATE, action) => {
    switch(action.type){
        case cartTypes.SET_CART:
            return {
                ...state,
                cartItemsArray: action.payload
            }
        case cartTypes.ADD_CART_ITEM:
            return {
                ...state,
                cartItemsArray: action.payload
            }
        case cartTypes.RESET_CART_ARRAY:
            return{
                ...state,
                cartItemsArray: []
            }
        default:
            return state;
    }
}

export default cartReducer;