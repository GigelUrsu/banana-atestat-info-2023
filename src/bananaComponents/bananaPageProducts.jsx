import React,{useEffect,useRef,useState} from "react";
import { Link } from "react-router-dom";
import "./bananaPageProducts_css.css";
// import bananaProducts from "./data/bananaProducts";
import {useSelector, useDispatch} from 'react-redux';
import { addBananasItem, removeBananasItem, resetBananasArray } from "../redux/bananas/bananas.actions";
import SpecialBananaR from "./otherBananaComponents/specialBananaR";
import SpecialBananaL from "./otherBananaComponents/specialBananaL";
import ItemBanana from "./otherBananaComponents/itemBanana";
import ItemsBanana from "./otherBananaComponents/itemsBanana";
import bananaprices from "./data/bananaprices.js";

const mapState = ({bananas}) =>({
    bananasArray: bananas.bananasItemsArray,
});

function BananaPageProducts(){

    const {bananasArray} = useSelector(mapState);
    const dispatch = useDispatch()

    const footer = useRef(null)
    const executeScrollToFooter = () => footer.current.scrollIntoView({ behavior: 'smooth' }) 

    const darkChocolateRef = useRef(null)
    const executeScrollToDarkChocolateRef = () => darkChocolateRef.current.scrollIntoView({ behavior: 'smooth' }) 

    const whiteChocolateRef = useRef(null)
    const executeScrollToWhiteChocolateReff = () => whiteChocolateRef.current.scrollIntoView({ behavior: 'smooth' }) 

    useEffect(()=>{window.scrollTo({ top: 0 , behavior: 'smooth'});},[])

    // const itemsBanana=(topping)=>{
    //     if(!bananaProducts[topping])return('')
    //     let itemsBananaArray = Object.keys(bananaProducts[topping]).map((item)=>{
    //             return Object.keys(bananaProducts[topping][item]).map((item2,index)=>{
    //                 return(
    //                     <div className="product" style={{}} key={index}>
    //                     <div className="productInner">
    //                         <div className="productInnerFront">
    //                             <img className="image" style={{height:""}} src={bananaProducts[topping][item][item2]["img"][0]} alt="" />
    //                             <p className="title">{bananaProducts[topping][item][item2]["title"]}</p>
    //                         </div>
    //                         <div className="productInnerBack">
    //                             <div className="descriere">
    //                                 <p>{bananaProducts[topping][item][item2]["topping"]}</p>
    //                                 <p>{bananaProducts[topping][item][item2]["candy"]}</p>
    //                                 <p onClick={()=>dispatch(addBananasItem(bananasArray,item2,topping,item,-1))}>{`Adauga ${item2==="slice"?"5 bucati":item2==="half"?"3 bucati":"o bucata"}`}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 )
    //             })
    //     })
    //     return itemsBananaArray
    // }
    // const itemBanana=(topping,candy,shape)=>{
    //     if(!bananaProducts[topping]||!candy||!shape)return('')
    //     return(
    //         <div className="product">
    //             <div className="productInner">
    //                 <div className="productInnerFront">
    //                     <img className="image" style={{height:""}} src={bananaProducts[topping][candy][shape]["img"][0]} alt="" />
    //                     <p className="title">{bananaProducts[topping][candy][shape]["title"]}</p>
    //                 </div>
    //                 <div className="productInnerBack">
    //                     <div className="descriere">
    //                         <p>{bananaProducts[topping][candy][shape]["topping"]}</p>
    //                         <p>{bananaProducts[topping][candy][shape]["candy"]}</p>
    //                         <p onClick={()=>dispatch(addBananasItem(bananasArray,shape,topping,candy,-1))}>{`Adauga ${shape==="slice"?"5 bucati":shape==="half"?"3 bucati":"o bucata"}`}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    const [showCart,setShowCart] = useState(0)
    const [shapeSelected,setShapeSelected] = useState("")
    const [toppingSelected,setToppingSelected] = useState("")
    const [candySelected,setCandySelected] = useState("")
    const [sauceSelected,setSauceSelected] = useState("")
    const [indexSelected,setIndexSelected] = useState(-1)
    const [showHeaderMenu,setShowHeaderMenu] = useState(0)

    function updateBananaItems(bananasArrayA,shapeA="",toppingA="",candyA="",sauceA="",indexA){
        // if(indexA<0){
        //     if(shapeA==="slice")
        //     setBananaItems(bananaItems=>[...bananaItems,{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,removable:true},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`}])
        //     else if(shapeA==="half")
        //     setBananaItems(bananaItems=>[...bananaItems,{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,removable:true},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`},{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`}])
        //     else
        //     setBananaItems(bananaItems=>[...bananaItems,{shape:`${shapeA}`,topping:`${toppingA}`,candy:`${candyA}`,removable:true}])
        // }else{
        //     let arr = [...bananaItems]
        //     arr[indexA]={shape:arr[indexA]["shape"],topping:`${toppingA}`,candy:`${candyA}`}
        //     // console.log(arr)
        //     setBananaItems(arr)
        // }
        dispatch(addBananasItem(bananasArrayA,shapeA,toppingA,candyA,sauceA || "simple",indexA))
        setShapeSelected("")
        setToppingSelected("")
        setCandySelected("")
        setSauceSelected("")
        setIndexSelected(-1)
    }
    function selectBananaItem(indexA){
        // if(bananaItems[indexA]){
        // setShapeSelected(`${bananaItems[indexA]["shape"]}`)
        // setToppingSelected(`${bananaItems[indexA]["topping"]}`)
        // setCandySelected(`${bananaItems[indexA]["candy"]}`)}
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
    function showCart_plusIndex(){
        setIndexSelected(-1);
        setShowCart(!showCart);
    }
    function removeBananaItem_plusIndex(bananasArray,itemShape,index){
        setIndexSelected(-1);
        dispatch(removeBananasItem(bananasArray,itemShape,index))
    }
    function resetBananasArray_plusIndex(){
        setIndexSelected(-1);
        dispatch(resetBananasArray())
        setShowCart(!showCart);
    }
    function bananaCartPrice(){
        let sum=0;
        bananasArray.forEach(bananaProduct=>{
            sum = sum +parseInt(bananaprices["bananaShapes"][`${bananaProduct["shape"]}`]["topping"][`${bananaProduct["topping"]}`])  + parseInt(bananaProduct["candy"]==="simple"?0:bananaprices["bananaShapes"][`${bananaProduct["shape"]}`]["candy"][`${bananaProduct["candy"]}`])  + parseInt(bananaProduct["sauce"]==="simple"?0:bananaprices["bananaShapes"][`${bananaProduct["shape"]}`]["sauce"][`${bananaProduct["sauce"]}`]);
        })
        return sum;
    }

    return(
        <div className="bananaPageProducts">
            {/* <div className="chatbot" style={{position:"fixed",right:"10px",zIndex:'2',bottom:'5%'}}>ChatBot</div> */}
            <p style={{display:"none"}} className="covaliustefan">Created by COVALIU STEFAN</p>
            <div className="scrollToUp fa fa-chevron-up" style={{position:"fixed",right:"2px",top:"50%",zIndex:"2",borderBottom:"2px solid black"}} onClick={()=>window.scrollTo({ top: 0 , behavior: 'smooth'})}></div>

            <div className="cart" style={{position:"fixed",bottom:"0",backgroundColor:"white",width:"100%",zIndex:"3"}}>
                {/* <p onClick={()=>showCart_plusIndex()} style={{margin:"auto 5%"}}><span style={{fontSize:"1.3em",cursor:"pointer"}} className={`fa fa-chevron-${showCart?"down":"up"}`}></span> <span style={{fontSize:"2em",cursor:"pointer"}}>Cart ({bananasArray.length?bananasArray.length:"empty"})</span> <span onClick={()=>resetBananasArray_plusIndex()} style={{fontWeight:"bold",margin:"0 10px",cursor:"pointer"}}>{showCart&&bananasArray.length>0?"Goleste":""}</span> <Link to={'/checkout'} style={{textDecoration:"none",color:"unset",fontWeight:"bold",margin:"0 10px"}}>{showCart&&bananasArray.length>0?"Checkout":""}</Link></p> */}
                <p onClick={()=>showCart_plusIndex()} style={{margin:"auto 5%"}}><span style={{fontSize:"1.3em",cursor:"pointer"}} className={`fa fa-chevron-${showCart?"down":"up"}`}></span> <span style={{fontSize:"2em",cursor:"pointer"}}>Cart ({bananasArray.length?bananasArray.length:"empty"})</span> <span style={{margin:"0 10px",cursor:"pointer",fontSize:"1.3em"}}>{showCart&&bananaCartPrice()>0?`Total ${bananaCartPrice()}lei`:""}</span> </p>
                {showCart&&bananasArray.length>0?<p style={{margin:"10px 5%",fontSize:"1.2em"}}>
                    <span onClick={()=>resetBananasArray_plusIndex()} style={{fontWeight:"bold",margin:"0 10px",cursor:"pointer"}}>{showCart&&bananasArray.length>0?"Goleste":""}</span> <Link to={'/checkout'} style={{textDecoration:"none",color:"unset",fontWeight:"bold",margin:"0 10px"}}>{showCart&&bananasArray.length>0?"Checkout":""}</Link>
                </p>:""}
                {showCart?bananasArray.length>0&&<div className="bananaItems" style={{display:"flex",padding:"0 5%",overflowX:"scroll"}}>
                {bananasArray.map((item,index)=>{
                    return(
                        <div className="bananaItem" key={index} style={{margin:"10px"}}>
                        <div className="img" style={{position:"relative"}}>
                        {/* <img onClick={()=>selectBananaItem(index)} style={{margin:"0 10px",height:"100px",transform:`scale(${item.shape==="full"?"1":".8"})`}} src={require(`./bananaImages/${item.shape}Logo.png`).default} alt="" /> */}
                        <img onClick={()=>selectBananaItem(index)} style={{margin:"0 10px",height:"100px",transform:`scale(${item.shape==="full"?"1":".8"})`}} src={require(`./bananaImages/${item.shape}Logo.png`)} alt="" />
                        <span style={{position:"absolute"}} className="fa fa-pencil" onClick={()=>selectBananaItem(index)}></span> 
                        {item.removable&&<span style={{position:"absolute",cursor:"pointer",bottom:"0"}} className="fa fa-trash" onClick={()=>removeBananaItem_plusIndex(bananasArray,item.shape,index)}></span>}
                        </div>
                        <div className="text">
                            <p>{item.topping}</p>
                            <p>{item.candy}</p>
                            <p>{item.sauce}</p>
                            {/* <p style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>{item.removable&&<span style={{color:"rgba(255, 0, 0,1)"}} onClick={()=>removeBananaItem_plusIndex(bananasArray,item.shape,index)}>Elimina {item.shape==="slice"?"5 bucati":item.shape==="half"?"3 bucati":''}</span>}</p> */}
                        </div>
                        
                        </div>
                    )
                })}
                </div>:''}
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
                                <div className="topingCard" style={{margin:"10px",cursor:"pointer",opacity:toppingSelected ? toppingSelected==="special"?'':'.6':''}} onClick={()=>setToppingSelected("special")}>
                                    {/* <img style={{height:"5vh",cursor:"pointer"}} src={require('./bananaImages/whiteChocolate.png').default} alt="" /> */}
                                    <img style={{height:"5vh",cursor:"pointer"}} src={require('./bananaImages/whiteChocolate.png')} alt="" />
                                    <p>Special</p>
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
                    {/* <p style={{margin:"10px 5%"}}>
                        <span style={{margin:"0 10px",fontWeight:"bold"}} onClick={()=>updateBananaItems(bananasArray,shapeSelected,toppingSelected,candySelected,sauceSelected,indexSelected)}>{indexSelected<0?`Adauga ${shapeSelected==="slice"?"5 bucati":shapeSelected==="half"?"3 bucati":"o bucata"}`:"Modifica"}</span>
                        <span style={{margin:"0"}} onClick={()=>unselectBananaItem()}>Cancel</span>
                    </p> */}
                </div>}
            </div>

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

            <div className="body" style={{backgroundColor:"#f6f5f0",height:"",color:""}}>
                <p className="" style={{fontSize:"2.5em",fontFamily:"Kaushan Script",height:"20vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#f6f5f0",margin:"0"}}>Descopera cel mai bun desert</p>
                <div className="upper" style={{backgroundColor:"",display:"flex",justifyContent:"center",gap:"3%",alignItems:"baseline",paddingBottom:"5vh",flexWrap:"wrap",background:""}}>
                    <p style={{backgroundColor:"#4d3631",color:"white",padding:"16px 32px",borderRadius:"16px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.5)"}} onClick={()=>executeScrollToDarkChocolateRef()}>Dark Chocolate</p>
                    <p style={{backgroundColor:"#fcdea8",padding:"16px 32px",borderRadius:"16px",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.5)"}} onClick={()=>executeScrollToWhiteChocolateReff()}>White Chocolate</p>
                </div>
                <div className="darkChocolate" ref={darkChocolateRef} style={{backgroundColor:"#4d3631"}}>
                    <p className="titleProduct" style={{height:"30vh",margin:"0",display:"flex",justifyContent:"center",alignItems:"center",color:"white",backgroundColor:"#f6f5f0",background:`linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.2)),url(${require('./bananaImages/darkChocolateBackground.png').default})`}}>Dark Chocolate</p>
                    
                    <SpecialBananaR topping={"special"} candy={"simple"} shape={"full"} sauce={"simple"}/>
                    <SpecialBananaL topping={"special"} candy={"simple"} shape={"half"} sauce={"simple"}/>
                    <SpecialBananaR topping={"special"} candy={"simple"} shape={"slice"} sauce={"simple"}/>

                    {/* <div className="grid" style={{backgroundColor:"#4d3631"}}>
                        {itemsBanana("darkChocolate")}
                    </div> */}

                    <div className="grid" style={{backgroundColor:"#4d3631"}}>
                        <ItemsBanana topping={"darkChocolate"}/>
                    </div>

                    <div className="grid" style={{backgroundColor:"#4d3631"}}>
                        {/* {itemBanana("darkChocolate","oreo","full")}
                        {itemBanana("darkChocolate","oreo","half")}
                        {itemBanana("darkChocolate","oreo","slice")} */}
                        <ItemBanana topping={"darkChocolate"} candy={"oreo"} shape={"full"} sauce={"simple"}/>
                        <ItemBanana topping={"darkChocolate"} candy={"oreo"} shape={"half"} sauce={"simple"}/>
                        <ItemBanana topping={"darkChocolate"} candy={"oreo"} shape={"slice"} sauce={"simple"}/>
                    </div>
                </div>
                <div className="whiteChocolate" ref={whiteChocolateRef} style={{backgroundColor:"#fcdea8"}}>
                    <p className="titleProduct" style={{height:"30vh",display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#f6f5f0",background:`linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.1)),url(${require('./bananaImages/whiteChocolateBackground.png').default})`}}>White Chocolate</p>
                    
                    <SpecialBananaR topping={"special"} candy={"simple"} shape={"full"} sauce={"simple"}/>
                    <SpecialBananaL topping={"special"} candy={"simple"} shape={"half"} sauce={"simple"}/>
                    <SpecialBananaR topping={"special"} candy={"simple"} shape={"slice"} sauce={"simple"}/>
                    
                    <div className="grid" style={{backgroundColor:"#fcdea8"}}>
                        <ItemsBanana topping={"darkChocolate"}/>
                    </div>

                    <div className="grid" style={{backgroundColor:"#fcdea8"}}>
                        <ItemBanana topping={"darkChocolate"} candy={"oreo"} shape={"full"} sauce={"simple"}/>
                        <ItemBanana topping={"darkChocolate"} candy={"oreo"} shape={"half"} sauce={"simple"}/>
                        <ItemBanana topping={"darkChocolate"} candy={"oreo"} shape={"slice"} sauce={"simple"}/>
                    </div>
                </div>
                <Link to={"/create"} className="titleProduct" style={{height:"20vh",fontSize:"2rem",display:"flex",justifyContent:"center",alignItems:"center",textDecoration:"none",color:"unset",backgroundColor:"#f6f5f0"}}>Create your own product</Link>
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
export default BananaPageProducts;


// <div className="product" style={{}}>
//     <div className="productInner">
//         <div className="productInnerFront">
//             <img className="image" style={{height:""}} src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//             <p className="title">Banana 3</p>
//         </div>
//         <div className="productInnerBack">
//             <div className="descriere">
//                 <p>Ciocolata neagra</p>
//                 <p>Nuci</p>
//             </div>
//         </div>
//     </div>
// </div>

// <div className="product" style={{}}>
//     <div className="productInner">
//         <div className="productInnerFront">
//             <img className="image" style={{height:""}} src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//             <p className="title">Banana 3</p>
//         </div>
//         <div className="productInnerBack">
//             <div className="descriere">
//                 <p>Ciocolata alba</p>
//                 <p>Nuci</p>
//             </div>
//         </div>
//     </div>
// </div>

// <div className="flexRL">
//     <div className="images">
//         <div className="mainImg">
//             <img className="mImage" src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//         </div>
//         <div className="secondaryImg" style={{display:"flex",alignItems:"flex-end",gap:"3%"}}>
//             <div className="imgDiv">
//                 <img className="image" src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//             </div>
//             <div className="imgDiv">
//                 <img className="image" src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//             </div>
//         </div>
//     </div>
//     <div className="text">
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur consequuntur dolores pariatur. Nihil neque ad, commodi modi suscipit quia, harum quam laborum iste aliquid assumenda minus eius! Atque, doloribus. Porro.</p>
//         <p>Buy</p>
//     </div>
// </div>
// <div className="flexRL" style={{flexWrap:"wrap-reverse"}}>
//     <div className="text">
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur consequuntur dolores pariatur. Nihil neque ad, commodi modi suscipit quia, harum quam laborum iste aliquid assumenda minus eius! Atque, doloribus. Porro.</p>
//         <p>Buy</p>
//     </div>
//     <div className="images">
//         <div className="mainImg">
//             <img className="mImage" src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//         </div>
//         <div className="secondaryImg" style={{display:"flex",alignItems:"flex-end",gap:"3%"}}>
//             <div className="imgDiv">
//                 <img className="image" src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//             </div>
//             <div className="imgDiv">
//                 <img className="image" src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//             </div>
//         </div>
//     </div>
// </div>
// <div className="flexRL">
//     <div className="images">
//         <div className="mainImg">
//             <img className="mImage" src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//         </div>
//         <div className="secondaryImg" style={{display:"flex",alignItems:"flex-end",gap:"3%"}}>
//             <div className="imgDiv">
//                 <img className="image" src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//             </div>
//             <div className="imgDiv">
//                 <img className="image" src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" />
//             </div>
//         </div>
//     </div>
//     <div className="text">
//         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur consequuntur dolores pariatur. Nihil neque ad, commodi modi suscipit quia, harum quam laborum iste aliquid assumenda minus eius! Atque, doloribus. Porro.</p>
//         <p>Buy</p>
//     </div>
// </div>

                        
