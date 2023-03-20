import productsTypes from "./products.types";

const INITIAL_STATE = {
    productsArray:[],
    searchProductsArray:[],
}

const productsReducer =(state=INITIAL_STATE, action) => {
    switch(action.type){
        case productsTypes.GET_PRODUCTS:
            return {
                ...state,
                productsArray: action.payload
            }
        case productsTypes.RESET_PRODUCTS_ARRAY:
            return {
                ...state,
                productsArray: []
            }
        case productsTypes.GET_SEARCH_PRODUCTS:
            return {
                ...state,
                searchProductsArray: action.payload
            }
        case productsTypes.RESET_SEARCH_PRODUCTS_ARRAY:
            return {
                ...state,
                searchProductsArray: []
            }
        default:
            return state;
    }
}

export default productsReducer;