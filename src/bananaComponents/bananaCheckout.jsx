import React,{useEffect,useRef,useState} from "react";
import {useSelector,useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import "./bananaCheckout_css.css";
import bananaprices from "./data/bananaprices.js";
import { handleBananaOrder } from "../firebase/utils";
import { resetBananasArray } from "../redux/bananas/bananas.actions";
import { useNavigate } from "react-router-dom";
import { addBananasItem, removeBananasItem } from "../redux/bananas/bananas.actions";


const mapState = ({bananas}) =>({
    bananasArray: bananas.bananasItemsArray,
});

function BananaCheckout(){
    let navigate = useNavigate();

    const [formEmail,setFormEmail] = useState("");
    const [formPhone,setFormPhone] = useState("");
    const [formCity,setFormCity] = useState("");
    const [formStreet,setFormStreet] = useState("");
    const [formChecked,setFormChecked] = useState(false);
    const [formPaymentMethod,setFormPaymentMethod] = useState("card");

    function handleChangeFormChecked(){
        setFormChecked(!formChecked);
    };

    const [showCart,setShowCart] = useState(0)

    const [shapeSelected,setShapeSelected] = useState("")
    const [toppingSelected,setToppingSelected] = useState("")
    const [candySelected,setCandySelected] = useState("")
    const [sauceSelected,setSauceSelected] = useState("")
    const [indexSelected,setIndexSelected] = useState(-1)

    function updateBananaItems(bananasArrayA,shapeA="",toppingA="",candyA="",sauceA="",indexA){
        dispatch(addBananasItem(bananasArrayA,shapeA,toppingA,candyA || "simple",sauceA || "simple",indexA))
        setShapeSelected("")
        setToppingSelected("")
        setCandySelected("")
        setSauceSelected("")
        setIndexSelected(-1)
    }
    function removeBananaItem(bananasArrayA,shapeA="",indexA){
        dispatch(removeBananasItem(bananasArrayA,shapeA,indexA))
        setShapeSelected("")
        setToppingSelected("")
        setCandySelected("")
        setSauceSelected("")
        setIndexSelected(-1)
    }
    function selectBananaItem(indexA){
        if(bananasArray[indexA]){
            setShapeSelected(`${bananasArray[indexA]["shape"]}`)
            setToppingSelected(`${bananasArray[indexA]["topping"]}`)
            setCandySelected(`${bananasArray[indexA]["candy"]}`)
            setSauceSelected(`${bananasArray[indexA]["sauce"]}`)
        }
        setIndexSelected(indexA)
    }
    function unselectBananaItem(){
        setShapeSelected("")
        setToppingSelected("")
        setCandySelected("")
        setSauceSelected("")
        setIndexSelected(-1)
    }
    function resetBananasArray_plusIndex(){
        setIndexSelected(-1);
        dispatch(resetBananasArray())
        setShowCart(!showCart);
    }

    const {bananasArray} = useSelector(mapState);
    const dispatch = useDispatch()

    const [showHeaderMenu,setShowHeaderMenu] = useState(0)

    const footer = useRef(null)
    const executeScrollToFooter = () => footer.current.scrollIntoView({ behavior: 'smooth' }) 
    useEffect(()=>{window.scrollTo({ top: 0 , behavior: 'smooth'});},[])

    function bananaCartPrice(){
        let sum=0;
        bananasArray.forEach(bananaProduct=>{
            sum = sum +parseInt(bananaprices["bananaShapes"][`${bananaProduct["shape"]}`]["topping"][`${bananaProduct["topping"]}`])  + parseInt(bananaProduct["candy"]==="simple"?0:bananaprices["bananaShapes"][`${bananaProduct["shape"]}`]["candy"][`${bananaProduct["candy"]}`])  + parseInt(bananaProduct["sauce"]==="simple"?0:bananaprices["bananaShapes"][`${bananaProduct["shape"]}`]["sauce"][`${bananaProduct["sauce"]}`]);
        })
        return sum;
    }

    function submitOrder(e){
        if(formPaymentMethod==="cash" || true){
            if(formChecked&&formEmail&&formPhone&&formCity&&formStreet&&bananasArray.length>0){
                if(handleBananaOrder(formEmail,formPhone,formCity,formStreet,bananasArray,bananaCartPrice())){
                    dispatch(resetBananasArray())}
                    navigate("/products"); }
        }
        e.preventDefault()
        setFormEmail("")
        setFormPhone("")
        setFormCity("")
        setFormStreet("")
        setFormChecked(false)
        setFormPaymentMethod("card")
    }

    return(
        <div className="bananaCheckout">

            <p style={{display:"none"}} className="covaliustefan">Created by COVALIU STEFAN</p>

            <div className="header" style={{height:"10vh",backgroundColor:"",color:"",position:"",top:"0",zIndex:"5",width:"100%"}}>
                <div className="flex" style={{display:"flex",justifyContent:"space-between",height:"100%",alignItems:"center",flexWrap:"wrap"}}>
                    <div className="left" style={{flex:""}}>
                        <Link to={"/"} style={{color:"unset",textDecoration:"none",margin:"0 5vw"}}>
                            {/* <img style={{height:"8vh"}} src={require('./bananaImages/bananaTransparent.png').default} alt="" /> */}
                            <img style={{height:"8vh"}} src={require('./bananaImages/bananaTransparent.png')} alt="" />
                        </Link>
                    </div>
                    <div className="right" style={{flex:"1",justifyContent:"space-evenly",alignItems:"center",flexWrap:"wrap"}}>
                        <Link to={"/products"} style={{color:"unset",textDecoration:"none",margin:""}}>Meniu</Link>
                        {/* <p style={{margin:""}}>Locatii</p> */}
                        <Link to={"/create"} style={{color:"unset",textDecoration:"none",margin:""}}>Create</Link>
                        <p onClick={(executeScrollToFooter)} style={{margin:"",cursor:"pointer"}}>Contact</p>
                    </div>
                    <div className="meniu" style={{marginRight:"5vw"}}>
                        <p onClick={()=>setShowHeaderMenu(!showHeaderMenu)} className="fa fa-bars"></p>
                    </div>
                    {showHeaderMenu?
                    <div className="menuHeader" style={{position:"absolute",zIndex:"",right:"0",top:"0"}}>
                        <p onClick={()=>setShowHeaderMenu(!showHeaderMenu)} className="fa fa-times closeButton" style={{display:"block",margin:"0",textAlign:"end"}}></p>
                        <Link to={"/products"} style={{color:"unset",textDecoration:"none",margin:"30px 20px 10px 20px",display:"block"}}>Meniu</Link>
                        <Link to={"/create"} style={{color:"unset",textDecoration:"none",margin:"30px 20px 10px 20px",display:"block"}}>Create</Link>
                        <p onClick={(executeScrollToFooter)} style={{margin:"30px 20px 10px 20px",display:"block"}}>Contact</p>
                    </div>
                    :''}
                    <div className="leftImg" style={{flex:""}}>
                        {/* <img style={{height:"8vh",opacity:"0",margin:"0 5vw"}} src={require('./bananaImages/bananaTransparent.png').default} alt="" /> */}
                        <img style={{height:"8vh",opacity:"0",margin:"0 5vw"}} src={require('./bananaImages/bananaTransparent.png')} alt="" />
                    </div>
                </div>
            </div>

            <p style={{height:"15vh",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"2em",fontWeight:"bold",margin:"0"}}>Place Your Order</p>
            <p style={{height:"5vh",fontSize:"1.5em",fontWeight:"bold",width:"80%",margin:"auto"}}>Your products:</p>

            <div className="cart" style={{backgroundColor:"white",width:"80%",margin:"auto"}}>
                {/* <p onClick={()=>showCart_plusIndex()} style={{margin:"auto 5%"}}><span style={{fontSize:"1.3em",cursor:"pointer"}} className={`fa fa-chevron-${showCart?"down":"up"}`}></span> <span style={{fontSize:"2em",cursor:"pointer"}}>Cart ({bananasArray.length?bananasArray.length:"empty"})</span> <span style={{margin:"0 10px",cursor:"pointer",fontSize:"1.3em"}}>{showCart&&bananaCartPrice()>0?`Total ${bananaCartPrice()}lei`:""}</span> </p> */}
                {showCart&&bananasArray.length>0?<p style={{margin:"10px 5%",fontSize:"1.2em"}}>
                    <span onClick={()=>resetBananasArray_plusIndex()} style={{fontWeight:"bold",margin:"0 10px",cursor:"pointer"}}>{showCart&&bananasArray.length>0?"Goleste":""}</span> <Link to={'/checkout'} style={{textDecoration:"none",color:"unset",fontWeight:"bold",margin:"0 10px"}}>{showCart&&bananasArray.length>0?"Checkout":""}</Link>
                </p>:""}
                {bananasArray.length>0&&<div className="bananaItems" style={{display:"flex",margin:"0",overflowX:"scroll"}}>
                {bananasArray.map((item,index)=>{
                    return(
                        <div className="bananaItem" key={index} style={{margin:"10px"}}>
                        <div className="img" style={{position:"relative"}}>
                        {/* <img onClick={()=>selectBananaItem(index)} style={{margin:"0 10px",height:"100px",transform:`scale(${item.shape==="full"?"1":".8"})`}} src={require(`./bananaImages/${item.shape}Logo.png`).default} alt="" /> */}
                        <img onClick={()=>selectBananaItem(index)} style={{margin:"0 10px",cursor:"pointer",height:"100px",transform:`scale(${item.shape==="full"?"1":".8"})`}} src={require(`./bananaImages/${item.shape}Logo.png`)} alt="" />
                        <span style={{position:"absolute",cursor:"pointer"}} className="fa fa-pencil" onClick={()=>selectBananaItem(index)}></span> 
                        {item.removable&&<span style={{position:"absolute",cursor:"pointer",bottom:"0"}} className="fa fa-trash" onClick={()=>removeBananaItem(bananasArray,item.shape,index)}></span>}
                        </div>
                        <div className="text">
                            <p>{item.topping}</p>
                            <p>{item.candy}</p>
                            <p>{item.sauce}</p>
                            {/* <p style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>{item.removable&&<span style={{color:"rgba(255, 0, 0,1)"}} onClick={()=>removeBananaItem(bananasArray,item.shape,index)}>Elimina {item.shape==="slice"?"5 bucati":item.shape==="half"?"3 bucati":''}</span>}</p> */}
                        </div>
                        </div>
                    )
                })}
                </div>}
                {indexSelected>=0&&
                <div className="edit">
                    <div style={{margin:"10px 5%",display:"flex"}}>
                        <h4 style={{margin:"0 10px",fontWeight:"bold",cursor:"pointer"}} onClick={()=>updateBananaItems(bananasArray,shapeSelected,toppingSelected,candySelected,sauceSelected,indexSelected)}>{indexSelected<0?`Adauga ${shapeSelected==="slice"?"5 bucati":shapeSelected==="half"?"3 bucati":"o bucata"}`:"Apply Changes"}</h4>
                        <h4>|</h4>
                        <h4 style={{margin:"0 10px",cursor:"pointer"}} onClick={()=>unselectBananaItem()}>Cancel</h4>
                    </div>
                    <div className="bigFlex" style={{display:"flex",justifyContent:"center"}}>
                        <div className="flex" style={{textAlign:"center",display:"flex",flexWrap:"wrap",margin:"0 5%"}}>
                                <div className="topingCard" style={{margin:"10px",cursor:"pointer",opacity:toppingSelected ? toppingSelected==="darkChocolate"?'':'.6':''}} onClick={()=>setToppingSelected("darkChocolate")}>
                                    {/* <img style={{height:"5vh",cursor:"pointer"}} src={require('./bananaImages/darkChocolate.png').default} alt="" /> */}
                                    <img style={{height:"5vh",cursor:"pointer"}} src={require('./bananaImages/darkChocolate.png')} alt="" />
                                    <p>Ciocolata Neagra</p>
                                </div>
                                <div className="topingCard" style={{margin:"10px",cursor:"pointer",opacity:toppingSelected ? toppingSelected==="whiteChocolate"?'':'.6':''}} onClick={()=>setToppingSelected("whiteChocolate")}>
                                    {/* <img style={{height:"5vh",cursor:"pointer"}} src={require('./bananaImages/whiteChocolate.png').default} alt="" /> */}
                                    <img style={{height:"5vh",cursor:"pointer"}} src={require('./bananaImages/whiteChocolate.png')} alt="" />
                                    <p>Ciocolata Alba</p>
                                </div>
                            </div>
                        <div className="flex" style={{display:"flex",flexWrap:"wrap",margin:"0 5%"}}>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="oreo"?'':'.6':''}} onClick={()=>candySelected==="oreo"?setCandySelected("simple"):setCandySelected("oreo")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/oreo.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/oreo.png')} alt="" />
                                    <p>Oreo</p>
                                </div>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="twix"?'':'.6':''}} onClick={()=>candySelected==="twix"?setCandySelected("simple"):setCandySelected("twix")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/twix.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/twix.png')} alt="" />
                                    <p>Twix</p>
                                </div>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="nuci"?'':'.6':''}} onClick={()=>candySelected==="nuci"?setCandySelected("simple"):setCandySelected("nuci")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/nuci.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/nuci.png')} alt="" />
                                    <p>Nuci</p>
                                </div>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="darkChocolateCandy"?'':'.6':''}} onClick={()=>candySelected==="darkChocolateCandy"?setCandySelected("simple"):setCandySelected("darkChocolateCandy")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/bomboaneCiocolataNeagra.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/bomboaneCiocolataNeagra.png')} alt="" />
                                    <p>Ciocolata</p>
                                </div>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="multicolorChocolateCandy"?'':'.6':''}} onClick={()=>candySelected==="multicolorChocolateCandy"?setCandySelected("simple"):setCandySelected("multicolorChocolateCandy")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/bomboaneMulticolore.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/bomboaneMulticolore.png')} alt="" />
                                    <p>Bomboane</p>
                                </div>
                        </div>
                        <div className="flex" style={{display:"flex",flexWrap:"wrap",margin:"0 5%"}}>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:sauceSelected ? sauceSelected==="darkChocolateTopping"?'':'.6':''}} onClick={()=>sauceSelected==="darkChocolateTopping"?setSauceSelected("simple"):setSauceSelected("darkChocolateTopping")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/oreo.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/oreo.png')} alt="" />
                                    <p>darkChocolateTopping</p>
                                </div>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:sauceSelected ? sauceSelected==="whiteChocolateTopping"?'':'.6':''}} onClick={()=>sauceSelected==="whiteChocolateTopping"?setSauceSelected("simple"):setSauceSelected("whiteChocolateTopping")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/twix.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/twix.png')} alt="" />
                                    <p>whiteChocolateTopping</p>
                                </div>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:sauceSelected ? sauceSelected==="caramelTopping"?'':'.6':''}} onClick={()=>sauceSelected==="caramelTopping"?setSauceSelected("simple"):setSauceSelected("caramelTopping")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/oreo.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/oreo.png')} alt="" />
                                    <p>caramelTopping</p>
                                </div>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:sauceSelected ? sauceSelected==="strawberryTopping"?'':'.6':''}} onClick={()=>sauceSelected==="strawberryTopping"?setSauceSelected("simple"):setSauceSelected("strawberryTopping")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/twix.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/twix.png')} alt="" />
                                    <p>strawberryTopping</p>
                                </div>
                                <div className="candyCard" style={{margin:"10px",backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:sauceSelected ? sauceSelected==="honeyTopping"?'':'.6':''}} onClick={()=>sauceSelected==="honeyTopping"?setSauceSelected("simple"):setSauceSelected("honeyTopping")}>
                                    {/* <img style={{height:"5vh"}} src={require('./bananaImages/twix.png').default} alt="" /> */}
                                    <img style={{height:"5vh"}} src={require('./bananaImages/twix.png')} alt="" />
                                    <p>honeyTopping</p>
                                </div>
                        </div>
                    </div>
                </div>}
            </div>
            
            {bananasArray.length>0&&<p style={{height:"5vh",display:"flex",justifyContent:"center",alignItems:"center",fontSize:"1.6em",fontWeight:"bold",margin:"5vh 0 0 0"}}>Total: {bananaCartPrice()}lei</p>}
            <div className="checkoutDiv" style={{height:"",display:"flex",justifyContent:"center",alignItems:"center"}}>
                <form className="stripeCheckout" onSubmit={(e)=>submitOrder(e)}>
                    <div className="email" style={{margin:"10px 0"}}>
                        <input required type='email' placeholder='Email' value={formEmail} onChange={(e)=>setFormEmail(e.target.value)}/>
                    </div>
                    <div className="email" style={{margin:"10px 0"}}>
                        <input required type="tel" placeholder="Phone Number" pattern="[0-9]{4}[0-9]{3}[0-9]{3}" value={formPhone} onChange={(e)=>setFormPhone(e.target.value)}/>
                    </div>
                    <div className="email" style={{margin:"10px 0"}}>
                        <input required type='text' placeholder='City' value={formCity} onChange={(e)=>setFormCity(e.target.value)}/>
                        <input required type='text' placeholder='Street + Nr' value={formStreet} onChange={(e)=>setFormStreet(e.target.value)}/>
                    </div>
                    <div className="acceptTerms" style={{margin:"10px 0", display:"flex",alignItems:"center"}}>
                        <input required type="checkbox" checked={formChecked} onChange={(e)=>handleChangeFormChecked()}/>
                        <p style={{margin:"0 0 0 10px"}}>I accept term and conditions</p>
                    </div>
                    <div className="paymentMethod" style={{margin:"10px 0", display:"flex",alignItems:"center"}}>
                        <input
                            type="radio"
                            name="paymentmethod"
                            value="card"
                            checked={formPaymentMethod === "card"}
                            onChange={(e)=>setFormPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="regular">Card</label>
                        <p style={{margin:"0 10px"}}></p>
                        <input
                            type="radio"
                            name="paymentmethod"
                            value="cash"
                            checked={formPaymentMethod === "cash"}
                            onChange={(e)=>setFormPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="medium">Cash</label>
                    </div>
                    <div className="checkout" style={{margin:"10px 0"}}>
                        <button type="submit" className="submitButton">{/* onClick={(e)=>submitOrder(e)} */}
                            Place Order
                        </button>
                    </div>
                </form>
            </div>

            <div className="otherInCheckout" style={{height:"30vh"}}>
            
            </div>

            <div ref={footer} className="footer" style={{backgroundColor:"#262626",margin:"0",padding:"20px 0 5vh 0"}}>
                <p style={{margin:"10px 0 10px 0",color:"white",textAlign:"center"}}>Email: frostybanana22@gmail.com</p>
                <p style={{height:"",margin:"10px 0 10px 0",color:"white",textAlign:"center",display:"flex",justifyContent:"center"}}>
                    <a style={{textDecoration:"none", color:"unset"}} href="https://m.me/SweetDipsRomania" target="_blank" rel="noreferrer">Messenger</a>
                </p>
                <p style={{height:"",margin:"10px 0 10px 0",color:"white",textAlign:"center"}}>© 2023 SweetDips</p>
            </div>

        </div>
    )
}

export default BananaCheckout;
