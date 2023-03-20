import transactionsTypes from "./transactions.types";

const INITIAL_STATE = {
    transactionsArray:[]
}

const transactionsReducer =(state=INITIAL_STATE, action) => {
    switch(action.type){
        case transactionsTypes.GET_TRANSACTIONS:
            return {
                ...state,
                transactionsArray: action.payload
            }
        case transactionsTypes.RESET_TRANSACTIONS_ARRAY:
            return {
                ...state,
                transactionsArray: []
            }
        default:
            return state;
    }
}

export default transactionsReducer;