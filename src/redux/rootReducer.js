import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';
import cartReducer from './Cart/cart.reducer';
import transactionsReducer from './Transactions/transactions.reducer';
import bananasReducer from './bananas/bananas.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    products:productsReducer,
    cart: cartReducer,
    transactions: transactionsReducer,
    bananas: bananasReducer
});

const configStore = {
    key: 'root',
    storage,
    whitelist: ['cart','bananas']
}; 

export default persistReducer(configStore, rootReducer);