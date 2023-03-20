import bananasTypes from "./bananas.types";

export const resetBananasArray = () =>({
    type: bananasTypes.RESET_BANANAS_ARRAY
});

export const setBananas = (itemArr) =>({
    type: bananasTypes.SET_BANANAS,
    payload: itemArr
});

export const addBananasItem = (bananasItemsArray,shapeA="",toppingA="",candyA="",sauceA="",indexA) => dispatch => {
    try {
        
        if(indexA<0){
            if(bananasItemsArray.length<50) // maxim 30 de produse
            if(shapeA==="slice")
            dispatch({
                type: bananasTypes.ADD_BANANAS_ITEM,
                payload: [...bananasItemsArray,{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`,removable:true},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`}]
            });
            else if(shapeA==="half")
            dispatch({
                type: bananasTypes.ADD_BANANAS_ITEM,
                payload: [...bananasItemsArray,{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`,removable:true},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`}]
            });
            else
            dispatch({
                type: bananasTypes.ADD_BANANAS_ITEM,
                payload: [...bananasItemsArray,{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`,removable:true}]
            });
        }else{
            let arr = [...bananasItemsArray]
            arr[indexA]={shape:arr[indexA]["shape"],topping:`${toppingA}`,candy:`${candyA}`,sauce:`${sauceA}`,removable:arr[indexA]["removable"]}
            dispatch({
                type: bananasTypes.ADD_BANANAS_ITEM,
                payload: arr
            });
        }
    } catch (err) {
        console.log(err)
    }
};

export const removeBananasItem = (bananasItemsArray,shapeA="",indexA) => dispatch => {
    try {
        dispatch({
            type: bananasTypes.REMOVE_BANANAS_ITEM,
            payload: bananasItemsArray.filter((item,index)=>(shapeA==="slice"&&(index<indexA||index>indexA+4))||(shapeA==="half"&&(index<indexA||index>indexA+2))||(shapeA==="full"&&(index!==indexA)))
        });
    } catch (err) {
        console.log(err)
    }
};

