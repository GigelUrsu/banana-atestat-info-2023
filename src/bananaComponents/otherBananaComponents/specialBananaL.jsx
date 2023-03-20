import React from "react";
import bananaProducts from "../data/bananaProducts";
import {useSelector, useDispatch} from 'react-redux';
import { addBananasItem } from "../../redux/bananas/bananas.actions";

const mapState = ({bananas}) =>({
    bananasArray: bananas.bananasItemsArray,
});

function SpecialBananaL({topping,candy,shape,sauce}){
    
    const {bananasArray} = useSelector(mapState);
    const dispatch = useDispatch()

    return(
        <div className="flexRL" style={{flexWrap:"wrap-reverse"}}>
            <div className="text">
                <p><span>{bananaProducts[topping][candy][shape]["title"]}.</span> <span>{bananaProducts[topping][candy][shape]["description"]}.</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur consequuntur dolores pariatur. Nihil neque ad, commodi modi suscipit quia, harum quam laborum iste aliquid assumenda minus eius! Atque, doloribus. Porro.</p>
                <p onClick={()=>dispatch(addBananasItem(bananasArray,shape,topping,candy,sauce,-1))}>{`Adauga ${shape==="slice"?"5 bucati":shape==="half"?"3 bucati":"o bucata"}`}</p>
            </div>
            <div className="images">
                <div className="mainImg">
                    {/* <img className="mImage" src={bananaProducts[topping][candy][shape]["img"][0]} alt="" /> */}
                    <img className="mImage" src={bananaProducts[topping][candy][shape]["imgNoDefault"][0]} alt="" />
                </div>
                        {/* <img className="image" src={bananaProducts[topping][candy][shape]["img"][0]} alt="" /> */}
                        {/* <img className="image" src={bananaProducts[topping][candy][shape]["img"][0]} alt="" /> */}
                {/* <div className="secondaryImg" style={{display:"flex",alignItems:"flex-end",gap:"3%"}}>
                    <div className="imgDiv">
                        <img className="image" src={bananaProducts[topping][candy][shape]["imgNoDefault"][0]} alt="" />
                    </div>
                    <div className="imgDiv">
                        <img className="image" src={bananaProducts[topping][candy][shape]["imgNoDefault"][0]} alt="" />
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default SpecialBananaL;
