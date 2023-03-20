import React from "react";
import bananaProducts from "../data/bananaProducts";
import {useSelector, useDispatch} from 'react-redux';
import { addBananasItem } from "../../redux/bananas/bananas.actions";

const mapState = ({bananas}) =>({
    bananasArray: bananas.bananasItemsArray,
});

function ItemBanana({topping,candy,shape,sauce}){

    const {bananasArray} = useSelector(mapState);
    const dispatch = useDispatch()

    if(!bananaProducts[topping]||!candy||!shape)return('')
        return(
            <div className="product">
                <div className="productInner">
                    <div className="productInnerFront">
                        {/* <img className="image" style={{height:""}} src={bananaProducts[topping][candy][shape]["img"][0]} alt="" /> */}
                        <img className="image" style={{height:""}} src={bananaProducts[topping][candy][shape]["imgNoDefault"][0]} alt="" />
                        <p className="title">{bananaProducts[topping][candy][shape]["title"]}</p>
                    </div>
                    <div className="productInnerBack">
                        <div className="descriere">
                            <p>{bananaProducts[topping][candy][shape]["topping"]}</p>
                            <p>{bananaProducts[topping][candy][shape]["candy"]}</p>
                            <p onClick={()=>dispatch(addBananasItem(bananasArray,shape,topping,candy,sauce,-1))}>{`Adauga ${shape==="slice"?"5 bucati":shape==="half"?"3 bucati":"o bucata"}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default ItemBanana;
