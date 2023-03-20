import cartTypes from "./cart.types";

export const resetCartArray = () =>({
    type: cartTypes.RESET_CART_ARRAY
});

export const setCart = (itemArr) =>({
    type: cartTypes.SET_CART,
    payload: itemArr
});

export const addCartItem = (cartArray,itemId,quantityNum) => dispatch => {
    try {
        const cartIdArray=cartArray.map((item)=>{
            return (
                item.productId
            )
        })
        if(!cartIdArray.includes(itemId))
        dispatch({
            type: cartTypes.ADD_CART_ITEM,
            payload: [...cartArray,{"productId":itemId, "quantity":quantityNum}]
        });
        else{
        let cartArrayUpdated =cartArray.map((itemM)=>{
            return {
                ...itemM,
                quantity: itemM.productId===itemId ? quantityNum===0?0:itemM.quantity + quantityNum : itemM.quantity
            }
        })
        // console.log(cartArrayUpdated)
        cartArrayUpdated = cartArrayUpdated.filter(itemF => itemF.quantity>0)
        // console.log(cartArrayUpdated)
        dispatch({
            type: cartTypes.ADD_CART_ITEM,
            payload: cartArrayUpdated
        });
        }
    } catch (err) {
        console.log(err)
    }
};

