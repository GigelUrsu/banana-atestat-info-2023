import productsTypes from "./products.types";
import { handleFetchProducts } from "../../firebase/utils";

export const resetProductsArray = () =>({
    type: productsTypes.RESET_PRODUCTS_ARRAY
});

export const getProducts = (filters={},sort) => async dispatch => {
    try {
        let proDucts = [] 
        if(filters.brand){
            if(filters.brand.value.length === 1){ 
                // console.log("single brand")
                filters = {...filters,"brand":{"operator":"==","value":filters["brand"]["value"][0]}} 
                proDucts = await handleFetchProducts(filters)
            } 
            else if(filters.brand.value.length > 1 &&  filters.color){
                // console.log("brand & color")
                const filt = filters.brand["value"].map((item,index)=>{
                    return {
                    ...filters,
                    "brand":{"operator":"==","value":filters["brand"]["value"][index]}
                    }
                })
                const prm = await Promise.all(filt.map((arr) => handleFetchProducts(arr)))
                // console.log(prm)
                proDucts = prm.flat()
                // proDucts = prm.map((item)=>{
                //     return item.flat()
                // })
                // console.log(proDucts)
                // proDucts=proDucts.filter(item=>item!==undefined)
            }
            else if(filters.brand.value.length > 1 &&  !filters.color){
                // console.log("brand noColor")
                filters = {...filters,"brand":{"operator":"in","value":filters["brand"]["value"]}} 
                proDucts = await handleFetchProducts(filters)
            }
        } 
        else proDucts = await handleFetchProducts(filters)

        if(filters.price1 && filters.price2){
        proDucts = proDucts.filter(item=>item.price>=filters.price1.value && item.price<=filters.price2.value)}

        if(proDucts.length>1 && sort==="rec")
        proDucts.sort((a,b)=>b.points-a.points)
        else if(proDucts.length>1 && sort==="cresc")
        proDucts.sort((a,b)=>a.price-b.price)
        else if(proDucts.length>1 && sort==="desc")
        proDucts.sort((a,b)=>b.price-a.price)

        if(filters.keywords)
        proDucts.sort((a,b)=>b.keywords[filters.keywords.value]-a.keywords[filters.keywords.value])

        dispatch({
            type: productsTypes.GET_PRODUCTS,
            payload: proDucts
        });
    } catch (err) {
        console.log(err)
    }
};

export const getProductsReturn = async(filters={}) => {
    try {
        // const proDucts = await handleFetchProducts(filters)
        let proDucts = [] 
        if(filters.brand){
            if(filters.brand.value.length === 1){ 
                // console.log("single brand")
                filters = {...filters,"brand":{"operator":"==","value":filters["brand"]["value"][0]}} 
                proDucts = await handleFetchProducts(filters)
            } 
            else if(filters.brand.value.length > 1 &&  filters.color){
                // console.log("brand & color")
                const filt = filters.brand["value"].map((item,index)=>{
                    return {
                    ...filters,
                    "brand":{"operator":"==","value":filters["brand"]["value"][index]}
                    }
                })
                const prm = await Promise.all(filt.map((arr) => handleFetchProducts(arr)))
                proDucts = prm.flat()
                // proDucts = prm.map((item)=>{
                //     return item[0]
                // })
                // proDucts=proDucts.filter(item=>item!==undefined)
                // console.log(proDucts)
            }
            else if(filters.brand.value.length > 1 &&  !filters.color){
                // console.log("brand noColor")
                filters = {...filters,"brand":{"operator":"in","value":filters["brand"]["value"]}} 
                proDucts = await handleFetchProducts(filters)
            }
        } 
        else proDucts = await handleFetchProducts(filters)

        if(filters.price1 && filters.price2){
            proDucts = proDucts.filter(item=>item.price>=filters.price1.value && item.price<=filters.price2.value)}
        // console.log(proDucts)
        
        return proDucts
    } catch (err) {
        console.log(err)
    }
};


export const resetSearchProductsArray = () =>({
    type: productsTypes.RESET_SEARCH_PRODUCTS_ARRAY
});

export const getSearchProducts = (filters={},sort) => async dispatch => {
    try {
        let proDucts = [] 
        if(filters.brand){
            if(filters.brand.value.length === 1){ 
                // console.log("single brand")
                filters = {...filters,"brand":{"operator":"==","value":filters["brand"]["value"][0]}} 
                proDucts = await handleFetchProducts(filters)
            } 
            else if(filters.brand.value.length > 1 &&  filters.color){
                // console.log("brand & color")
                const filt = filters.brand["value"].map((item,index)=>{
                    return {
                    ...filters,
                    "brand":{"operator":"==","value":filters["brand"]["value"][index]}
                    }
                })
                const prm = await Promise.all(filt.map((arr) => handleFetchProducts(arr)))
                // console.log(prm)
                proDucts = prm.flat()
                // proDucts = prm.map((item)=>{
                //     return item.flat()
                // })
                // console.log(proDucts)
                // proDucts=proDucts.filter(item=>item!==undefined)
            }
            else if(filters.brand.value.length > 1 &&  !filters.color){
                // console.log("brand noColor")
                filters = {...filters,"brand":{"operator":"in","value":filters["brand"]["value"]}} 
                proDucts = await handleFetchProducts(filters)
            }
        } 
        else proDucts = await handleFetchProducts(filters)

        if(filters.price1 && filters.price2){
        proDucts = proDucts.filter(item=>item.price>=filters.price1.value && item.price<=filters.price2.value)}

        if(proDucts.length>1 && sort==="rec")
        proDucts.sort((a,b)=>b.points-a.points)
        else if(proDucts.length>1 && sort==="cresc")
        proDucts.sort((a,b)=>a.price-b.price)
        else if(proDucts.length>1 && sort==="desc")
        proDucts.sort((a,b)=>b.price-a.price)

        if(filters.keywords)
        proDucts.sort((a,b)=>b.keywords[filters.keywords.value]-a.keywords[filters.keywords.value])

        dispatch({
            type: productsTypes.GET_SEARCH_PRODUCTS,
            payload: proDucts
        });
    } catch (err) {
        console.log(err)
    }
};