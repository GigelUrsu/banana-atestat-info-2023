import transactionsTypes from "./transactions.types";
import { handleFetchTransactions } from "../../firebase/utils";

export const resetTransactionsArray = () =>({
    type: transactionsTypes.RESET_TRANSACTIONS_ARRAY
});

export const getTransactions = (filters={},sort) => async dispatch => {
    try {
        let transactions = await handleFetchTransactions(filters)

        if(transactions.length>1 && sort==="cresc")
        transactions.sort((a,b)=>a.aAaFastDATA.date-b.aAaFastDATA.date)
        else if(transactions.length>1 && sort==="desc")
        transactions.sort((a,b)=>b.aAaFastDATA.date-a.aAaFastDATA.date)

        dispatch({
            type: transactionsTypes.GET_TRANSACTIONS,
            payload: transactions
        });
    } catch (err) {
        console.log(err)
    }
};
