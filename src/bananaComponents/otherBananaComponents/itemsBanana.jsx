import React from "react";
import bananaProducts from "../data/bananaProducts";
import {useSelector, useDispatch} from 'react-redux';
import { addBananasItem } from "../../redux/bananas/bananas.actions";

const mapState = ({bananas}) =>({
    bananasArray: bananas.bananasItemsArray,
});

function ItemsBanana({topping}){

    const {bananasArray} = useSelector(mapState);
    const dispatch = useDispatch()

    const itemsBananaF=(topping)=>{
        if(!bananaProducts[topping])return('')
        let itemsBananaArray = Object.keys(bananaProducts[topping]).map((item)=>{
                return Object.keys(bananaProducts[topping][item]).map((item2,index)=>{
                    return(
                        <div className="product" style={{}} key={index}>
                        <div className="productInner">
                            <div className="productInnerFront">
                                {/* <img className="image" style={{height:""}} src={bananaProducts[topping][item][item2]["img"][0]} alt="" /> */}
                                <img className="image" style={{height:""}} src={bananaProducts[topping][item][item2]["imgNoDefault"][0]} alt="" />
                                <p className="title">{bananaProducts[topping][item][item2]["title"]}</p>
                            </div>
                            <div className="productInnerBack">
                                <div className="descriere">
                                    <p>{bananaProducts[topping][item][item2]["topping"]}</p>
                                    <p>{bananaProducts[topping][item][item2]["candy"]}</p>
                                    <p onClick={()=>dispatch(addBananasItem(bananasArray,item2,topping,item,"simple",-1))}>{`Adauga ${item2==="slice"?"5 bucati":item2==="half"?"3 bucati":"o bucata"}`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                })
        })
        // console.log(itemsBananaArray)
        return itemsBananaArray
    }

    return(
        itemsBananaF(topping)
    )
}

export default ItemsBanana;
