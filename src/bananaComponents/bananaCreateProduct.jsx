import React,{useState,useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import "./bananaCreateProduct_css.css";
import bananaProducts from "./data/bananaProducts";
import {useSelector, useDispatch} from 'react-redux';
import { addBananasItem, removeBananasItem, resetBananasArray } from "../redux/bananas/bananas.actions";
import bananaprices from "./data/bananaprices.js";

const mapState = ({bananas}) =>({
    bananasArray: bananas.bananasItemsArray,
});

function BananaCreateProduct(){

    const {bananasArray} = useSelector(mapState);
    const dispatch = useDispatch()

    const footer = useRef(null)
    const executeScrollToFooter = () => footer.current.scrollIntoView({ behavior: 'smooth' }) 

    const createProductRef = useRef(null)
    const executeScrollToCreateProductRef = () => createProductRef.current.scrollIntoView({ behavior: 'smooth' }) 

    const [shapeSelected,setShapeSelected] = useState("")
    const [toppingSelected,setToppingSelected] = useState("")
    const [candySelected,setCandySelected] = useState("")
    const [sauceSelected,setSauceSelected] = useState("")
    const [indexSelected,setIndexSelected] = useState(-1)

    const [showCart,setShowCart] = useState(0)
    const [showHeaderMenu,setShowHeaderMenu] = useState(0)

    // const [bananaItems,setBananaItems] = useState([])
    useEffect(()=>{window.scrollTo({ top: 0 , behavior: 'smooth'});},[])

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
        // setBananaItems(bananaItems=>bananaItems.filter((item,index)=>(shapeA==="slice"&&(index<indexA||index>indexA+4))||(shapeA==="half"&&(index<indexA||index>indexA+2))||(shapeA==="full"&&(index!==indexA))))
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
        <div className="bananaCreateProduct">

            <p style={{display:"none"}} className="covaliustefan">Created by COVALIU STEFAN</p>

            {/* <div className="chatbot" style={{position:"fixed",right:"10px",zIndex:'2',bottom:'5%'}}>ChatBot</div> */}

            <div className="scrollToUp fa fa-chevron-up" style={{position:"fixed",right:"2px",top:"50%",zIndex:"2",borderBottom:"2px solid black"}} onClick={()=>window.scrollTo({ top: 0 , behavior: 'smooth'})}></div>

            <div className="cart" style={{position:"fixed",bottom:"0",backgroundColor:"white",width:"100%",zIndex:"3"}}>
                <p onClick={()=>showCart_plusIndex()} style={{margin:"auto 5%"}}><span style={{fontSize:"1.3em",cursor:"pointer"}} className={`fa fa-chevron-${showCart?"down":"up"}`}></span> <span style={{fontSize:"2em",cursor:"pointer"}}>Cart ({bananasArray.length?bananasArray.length:"empty"})</span> <span style={{margin:"0 10px",cursor:"pointer",fontSize:"1.3em"}}>{showCart&&bananaCartPrice()>0?`Total ${bananaCartPrice()}lei`:""}</span> </p>
                {showCart&&bananasArray.length>0?<p style={{margin:"10px 5%",fontSize:"1.2em"}}>
                    <span onClick={()=>resetBananasArray_plusIndex()} style={{fontWeight:"bold",margin:"0 10px",cursor:"pointer"}}>{showCart&&bananasArray.length>0?"Goleste":""}</span> <Link to={'/checkout'} style={{textDecoration:"none",color:"unset",fontWeight:"bold",margin:"0 10px"}}>{showCart&&bananasArray.length>0?"Checkout":""}</Link>
                </p>:""}
                {showCart?bananasArray.length>0&&<div className="bananaItems" style={{display:"flex",margin:"0 5%",overflowX:"scroll"}}>
                {bananasArray.map((item,index)=>{
                    return(
                        <div className="bananaItem" key={index} style={{margin:"10px"}}>
                        <div className="img" style={{position:"relative"}}>
                        {/* <img onClick={()=>selectBananaItem(index)} style={{margin:"0 10px",height:"100px",transform:`scale(${item.shape==="full"?"1":".8"})`}} src={require(`./bananaImages/${item.shape}Logo.png`).default} alt="" /> */}
                        <img onClick={()=>selectBananaItem(index)} style={{margin:"0 10px",height:"100px",transform:`scale(${item.shape==="full"?"1":".8"})`}} src={require(`./bananaImages/${item.shape}Logo.png`)} alt="" />
                        <span style={{position:"absolute"}} className="fa fa-pencil" onClick={()=>selectBananaItem(index)}></span> 
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

            <div className="top" style={{height:"",display:"flex",justifyContent:"center",alignItems:"center",margin:"10vh 5% 36vh 5%",flexWrap:"wrap"}}>
                <div className="text" style={{flex:"1",textAlign:"center",fontSize:"1.5em",position:"relative",minWidth:"40vw"}}>
                    <p style={{fontFamily:"Kaushan Script",fontSize:"2em"}}>Inca nu te-ai decis?</p>
                    <p>Creaza-ti desertul preferat</p>
                    <p>Asa cum iti place tie</p>
                    <p>Iar noi il vom pregati de indata.</p>
                    {/* <img style={{height:"30vh",position:"absolute",left:"0",transform:"translate(0,0%) rotate(30deg)"}} src={require('./bananaImages/bananasProducts/Untitled1.png').default} alt="" /> */}
                    {/* <img style={{height:"30vh",position:"absolute",left:"0",transform:"translate(50%,50%) rotate(50deg)"}} src={require('./bananaImages/bananasProducts/Untitled2.png').default} alt="" /> */}
                </div>
                <div className="images" style={{flex:"1",textAlign:"center",position:"relative",overflow:""}}>
                    {/* <img style={{maxHeight:'50vh',maxWidth:"80vw"}} src={require('./bananaImages/bananaInHand.png').default} alt="" />
                    <img style={{maxHeight:'50vh',maxWidth:"40vw",position:"absolute",top:"100%",left:"50%",right:"50%",zIndex:"2",transform:"translate(0,-25%)",border:"1.8vw solid white"}} src={require('./bananaImages/bananaTopVertical.png').default} alt="" />
                    <img style={{maxHeight:'30vh',maxWidth:"50vw",position:"absolute",top:"100%",left:"50%",right:"50%",transform:"translate(-90%,0)",border:"1.8vw solid white"}} src={require('./bananaImages/bananaPlate.png').default} alt="" /> */}
                    <img style={{maxHeight:'50vh',maxWidth:"80vw"}} src={require('./bananaImages/bananaInHand.png')} alt="" />
                    <img style={{maxHeight:'50vh',maxWidth:"40vw",position:"absolute",top:"100%",left:"50%",right:"50%",zIndex:"2",transform:"translate(0,-25%)",border:"1.8vw solid white"}} src={require('./bananaImages/bananaTopVertical.png')} alt="" />
                    <img style={{maxHeight:'30vh',maxWidth:"50vw",position:"absolute",top:"100%",left:"50%",right:"50%",transform:"translate(-90%,0)",border:"1.8vw solid white"}} src={require('./bananaImages/bananaPlate.png')} alt="" />
                </div>
            </div>

            <div ref={createProductRef} className="body" style={{backgroundColor:"",height:"",color:"",marginTop:"20vh",width:"100%"}}>
                <div className="shapePick" style={{display:"",justifyContent:"",width:"100%",backgroundColor:"#e55b7e",padding:"2vh 0"}}>
                <p style={{textAlign:"center",padding:"0vh 0 2vh 0",fontFamily:"Kaushan Script",fontSize:"2em"}}>Select a shape</p>
                    
                    <div className="flex" onClick={()=>setShapeSelected("slice")} style={{opacity:shapeSelected ? shapeSelected==="slice"?'':'.6':'',cursor:"pointer"}}>
                        <div className="img" style={{backgroundColor:"white",flex:"1",display:"flex",justifyContent:"center",backgroundImage:`url(${require('./bananaImages/bananaChips.png').default})`,height:"100%",backgroundPosition:"center",backgroundSize:"cover"}}>
                            {/* <img style={{height:"40vh",cursor:"pointer"}} src={require('./bananaImages/bananaChips.png').default} alt="" /> */}
                            <img style={{height:"40vh",cursor:"pointer"}} src={require('./bananaImages/bananaChips.png')} alt="" />
                        </div>
                        <div className="text" style={{flex:'100',minWidth:"40vw",maxWidth:"",backgroundColor:"white",padding:"4% 4%"}}>
                            <p style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",margin:"0"}}>Banana full Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est ex sunt tenetur libero voluptates voluptate saepe nulla eos illum quam! Magnam officia neque omnis, incidunt totam atque dolores provident corrupti ex sed commodi itaque esse dolor amet, quae cumque, ipsum iusto veniam aperiam necessitatibus pariatur quis ea! Minus, quidem ut.</p>
                        </div>
                    </div>
                    
                    <div className="flex" onClick={()=>setShapeSelected("half")} style={{flexWrap:"wrap-reverse",opacity:shapeSelected ? shapeSelected==="half"?'':'.6':'',cursor:"pointer"}}>
                        <div className="text" style={{flex:'100',minWidth:"40vw",maxWidth:"",backgroundColor:"white",padding:"4% 4%"}}>
                            <p style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",margin:"0"}}>Banana full Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est ex sunt tenetur libero voluptates voluptate saepe nulla eos illum quam! Magnam officia neque omnis, incidunt totam atque dolores provident corrupti ex sed commodi itaque esse dolor amet, quae cumque, ipsum iusto veniam aperiam necessitatibus pariatur quis ea! Minus, quidem ut.</p>
                        </div>
                        <div className="img" style={{backgroundColor:"white",flex:"1",display:"flex",justifyContent:"center",backgroundImage:`url(${require('./bananaImages/customBananas.png').default})`,height:"100%",backgroundPosition:"center",backgroundSize:"cover"}}>
                            {/* <img style={{height:"40vh",cursor:"pointer"}} src={require('./bananaImages/customBananas.png').default} alt="" /> */}
                            <img style={{height:"40vh",cursor:"pointer"}} src={require('./bananaImages/customBananas.png')} alt="" />
                        </div>
                    </div>
                    <div className="flex" onClick={()=>setShapeSelected("full")} style={{opacity:shapeSelected ? shapeSelected==="full"?'':'.6':'',cursor:"pointer"}}>
                        <div className="img" style={{backgroundColor:"white",flex:"1",display:"flex",justifyContent:"center",backgroundImage:`url(${require('./bananaImages/horizontalBananas.png').default})`,height:"100%",backgroundPosition:"center",backgroundSize:"cover"}}>
                            {/* <img style={{height:"40vh",cursor:"pointer"}} src={require('./bananaImages/horizontalBananas.png').default} alt="" /> */}
                            <img style={{height:"40vh",cursor:"pointer"}} src={require('./bananaImages/horizontalBananas.png')} alt="" />
                        </div>
                        <div className="text" style={{flex:'100',minWidth:"40vw",maxWidth:"",backgroundColor:"white",padding:"4% 4%"}}>
                            <p style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%",margin:"0"}}>Banana full Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est ex sunt tenetur libero voluptates voluptate saepe nulla eos illum quam! Magnam officia neque omnis, incidunt totam atque dolores provident corrupti ex sed commodi itaque esse dolor amet, quae cumque, ipsum iusto veniam aperiam necessitatibus pariatur quis ea! Minus, quidem ut.</p>
                        </div>
                    </div>
                </div>
                <div className="topingPick" style={{backgroundColor:"##f6da73",marginTop:"",width:"100%",overflow:"hidden"}}>
                    <p style={{textAlign:"center",margin:"0",padding:"10vh 0 5vh 0",fontFamily:"Kaushan Script",fontSize:"2em"}}>Select a topping</p>
                    <div className="flex" style={{textAlign:"center",display:"flex",justifyContent:"space-evenly",flexWrap:"wrap",padding:"0 15% 10vh 15%"}}>
                        <div className="topingCard" style={{cursor:"pointer",opacity:toppingSelected ? toppingSelected==="darkChocolate"?'':'.6':''}} onClick={()=>setToppingSelected("darkChocolate")}>
                            {/* <img style={{height:"15vh",cursor:"pointer"}} src={require('./bananaImages/darkChocolate.png').default} alt="" /> */}
                            <img style={{height:"15vh",cursor:"pointer"}} src={require('./bananaImages/darkChocolate.png')} alt="" />
                            <p>Ciocolata Neagra</p>
                        </div>
                        <div className="topingCard" style={{cursor:"pointer",opacity:toppingSelected ? toppingSelected==="whiteChocolate"?'':'.6':''}} onClick={()=>setToppingSelected("whiteChocolate")}>
                            {/* <img style={{height:"15vh",cursor:"pointer"}} src={require('./bananaImages/whiteChocolate.png').default} alt="" /> */}
                            <img style={{height:"15vh",cursor:"pointer"}} src={require('./bananaImages/whiteChocolate.png')} alt="" />
                            <p>Ciocolata Alba</p>
                        </div>
                    </div>
                    {/* <img onClick={()=>setToppingSelected("pinkChocolate")} style={{height:"30vh",cursor:"pointer",border:toppingSelected ? toppingSelected==="pinkChocolate"?'':'.6':''}} src={require('./bananaImages/horizontalBananas.png').default} alt="" /> */}
                </div>
                <div className="candyPick" style={{backgroundColor:"##f6da73",width:"100%",position:"relative"}}>
                    <p style={{textAlign:"center",margin:"0",padding:"0vh 0 5vh 0",fontFamily:"Kaushan Script",fontSize:"2em"}}>Select a candy</p>
                    <div className="flex" style={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap",padding:"0 15% 5vh 15%"}}>
                        <div className="candyCard" style={{backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="oreo"?'':'.6':''}} onClick={()=>candySelected==="oreo"?setCandySelected(""):setCandySelected("oreo")}>
                            {/* <img style={{height:"10vh"}} src={require('./bananaImages/oreo.png').default} alt="" /> */}
                            <img style={{height:"10vh"}} src={require('./bananaImages/oreo.png')} alt="" />
                            <p>Oreo</p>
                        </div>
                        <div className="candyCard" style={{backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="twix"?'':'.6':''}} onClick={()=>candySelected==="twix"?setCandySelected(""):setCandySelected("twix")}>
                            {/* <img style={{height:"10vh"}} src={require('./bananaImages/twix.png').default} alt="" /> */}
                            <img style={{height:"10vh"}} src={require('./bananaImages/twix.png')} alt="" />
                            <p>Twix</p>
                        </div>
                        <div className="candyCard" style={{backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="nuci"?'':'.6':''}} onClick={()=>candySelected==="nuci"?setCandySelected(""):setCandySelected("nuci")}>
                            {/* <img style={{height:"10vh"}} src={require('./bananaImages/nuci.png').default} alt="" /> */}
                            <img style={{height:"10vh"}} src={require('./bananaImages/nuci.png')} alt="" />
                            <p>Nuci</p>
                        </div>
                        <div className="candyCard" style={{backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="darkChocolateCandy"?'':'.6':''}} onClick={()=>candySelected==="darkChocolateCandy"?setCandySelected(""):setCandySelected("darkChocolateCandy")}>
                            {/* <img style={{height:"10vh"}} src={require('./bananaImages/bomboaneCiocolataNeagra.png').default} alt="" /> */}
                            <img style={{height:"10vh"}} src={require('./bananaImages/bomboaneCiocolataNeagra.png')} alt="" />
                            <p>Ciocolata</p>
                        </div>
                        <div className="candyCard" style={{backgroundColor:"",textAlign:"center",cursor:"pointer",opacity:candySelected ? candySelected==="multicolorChocolateCandy"?'':'.6':''}} onClick={()=>candySelected==="multicolorChocolateCandy"?setCandySelected(""):setCandySelected("multicolorChocolateCandy")}>
                            {/* <img style={{height:"10vh"}} src={require('./bananaImages/bomboaneMulticolore.png').default} alt="" /> */}
                            <img style={{height:"10vh"}} src={require('./bananaImages/bomboaneMulticolore.png')} alt="" />
                            <p>Bomboane</p>
                        </div>
                    </div>
                </div>
                {shapeSelected&&toppingSelected&&<div className="createdProduct" style={{textAlign:"center",marginTop:"5%"}}>
                    {/* <img style={{height:"20vh",paddingBottom:""}} src={bananaProducts[toppingSelected][candySelected||"simple"] ? bananaProducts[toppingSelected][candySelected||"simple"][shapeSelected]["img"][0] : require('./bananaImages/oreo.png').default} alt="" /> */}
                    {/* <img style={{height:"20vh",paddingBottom:""}} src={bananaProducts[toppingSelected][candySelected||"simple"] ? bananaProducts[toppingSelected][candySelected||"simple"][shapeSelected]["img"][0] : require('./bananaImages/oreo.png')} alt="" /> */}
                    <img style={{height:"20vh",paddingBottom:""}} src={bananaProducts[toppingSelected][candySelected||"simple"] ? bananaProducts[toppingSelected][candySelected||"simple"][shapeSelected]["imgNoDefault"][0] : require('./bananaImages/oreo.png')} alt="" />
                    <p style={{fontWeight:"bold"}}>{bananaProducts[toppingSelected][candySelected||"simple"] ? bananaProducts[toppingSelected][candySelected||"simple"][shapeSelected]["title"] : "bananaNotFoundCombination Topping+candy"}</p>
                    <p>
                        <span style={{margin:"0 10px",fontWeight:"bold"}} onClick={()=>updateBananaItems(bananasArray,shapeSelected,toppingSelected,candySelected,sauceSelected,indexSelected)}>{indexSelected<0?`Adauga ${shapeSelected==="slice"?"5 bucati":shapeSelected==="half"?"3 bucati":"o bucata"}`:"Modifica"}</span>
                        <span style={{margin:"0"}} onClick={()=>unselectBananaItem()}>Cancel</span>
                    </p>
                    {/* <p style={{fontWeight:"bold"}} onClick={()=>updateBananaItems(bananasArray,shapeSelected,toppingSelected,candySelected,sauceSelected,indexSelected)}>{indexSelected<0?`Adauga ${shapeSelected==="slice"?"5 bucati":shapeSelected==="half"?"3 bucati":"o bucata"}`:"Modifica"}</p> */}
                </div>}
                {(!shapeSelected&&!toppingSelected&&!candySelected)?
                    <p onClick={()=>executeScrollToCreateProductRef()} style={{textAlign:"center",fontSize:"1.2em"}}>Alege un Model, Toppingul si Dulciurile!</p>
                    :
                    (!shapeSelected||!toppingSelected||!candySelected)?<p onClick={()=>executeScrollToCreateProductRef()} style={{textAlign:"center",fontSize:"1.2em"}}>Nu ai ales {!shapeSelected?'Forma':''} {!shapeSelected&&!toppingSelected?'si':''} {!shapeSelected&&!candySelected?'si':''} {!toppingSelected?'Toppingul':''} {!toppingSelected&&!candySelected?'si':''} {!candySelected?'Dulciurile':''}!</p>
                    :''
                }

                {/* <div className="cartTitle" style={{display:"flex",flexWrap:"wrap",margin:"2% 5%",alignItems:"baseline"}}>
                    <p style={{fontFamily:"Kaushan Script",fontSize:"2em"}}>Cart</p>
                    <p style={{margin:"0 10px",fontSize:"1.1em"}} onClick={()=>executeScrollToCreateProductRef()}>Adauga</p>
                    <p style={{margin:"0 10px",fontSize:"1.1em"}} onClick={()=>dispatch(resetBananasArray())}>{bananasArray.length>0&&"Goleste"}</p>
                </div>
                {bananasArray.length>0&&<div className="bananaItems" style={{display:"flex",padding:"0 5%",flexWrap:"wrap",justifyContent:""}}>
                {bananasArray.map((item,index)=>{
                    return(
                        <div className="bananaItem" key={index} style={{margin:"10px"}}>
                        <div className="img" style={{position:"relative"}}>
                        <img onClick={()=>selectBananaItem(index)} style={{margin:"0 10px",height:"100px",transform:`scale(${item.shape==="full"?"1":".8"})`}} src={require(`./bananaImages/${item.shape}Logo.png`).default} alt="" />
                        <span style={{position:"absolute"}} className="fa fa-pencil" onClick={()=>selectBananaItem(index)}></span> 
                        </div>
                        <div className="text">
                            <p>{item.topping}</p>
                            <p>{item.candy}</p>
                            <p style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}}>{item.removable&&<span style={{color:"rgba(255, 0, 0,1)"}} onClick={()=>removeBananaItem(bananasArray,item.shape,index)}>Elimina {item.shape==="slice"?"5 bucati":item.shape==="half"?"3 bucati":''}</span>}</p>
                        </div>
                        
                        </div>
                    )
                })}
                </div>} */}
                
                    <div className="story" style={{height:"max-content",backgroundColor:"",color:'black',margin:"10vh 5%",overflow:"hidden"}}>
                        <div className="flex" style={{display:"flex",justifyContent:"space-between",height:"100%",flexWrap:"wrap",gap:"2.5%"}}>
                            {/* <img src={require('./bananaImages/foodtruck.png').default} alt="" style={{width:"100%",height:"",flex:"1",objectFit:"cover"}}/> */}
                            <img src={require('./bananaImages/foodtruck.png')} alt="" style={{width:"100%",height:"",flex:"1",objectFit:"cover"}}/>
                            <div className="text" style={{flex:"1",height:"max-content",overflow:'',minWidth:"50%",display:"",justifyContent:'center',alignItems:"center",textAlign:"center"}}>
                                <p style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:'center',maxWidth:""}}>Te asteptam la City Park Mall sa incerci cel mai bun desert</p>
                                <div style={{display:"flex",justifyContent:'center'}}>
                                <div className="mapouter" style={{position:"relative",textAlign:"right",height:"",width:""}}><div className="gmap_canvas" style={{overflow:"hidden",background:"none",height:"500px",width:"600px"}}><iframe title="titleMap" width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=constana%20city%20park&t=&z=15&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                
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
export default BananaCreateProduct;
