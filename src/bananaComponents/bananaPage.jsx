import React,{useEffect,useRef,useState} from "react";
import { Link } from "react-router-dom";
import "./bananaPage_css.css";
// import ItemBanana from "./otherBananaComponents/itemBanana";
import {useSelector, useDispatch} from 'react-redux';
// import bananaProducts from "./data/bananaProducts";
import { addBananasItem, removeBananasItem, resetBananasArray } from "../redux/bananas/bananas.actions";
import bananaprices from "./data/bananaprices.js";

const mapState = ({bananas}) =>({
    bananasArray: bananas.bananasItemsArray,
});

function BananaPage(){

    const {bananasArray} = useSelector(mapState);
    const dispatch = useDispatch()

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

    const footer = useRef(null)
    const executeScrollToFooter = () => footer.current.scrollIntoView({ behavior: 'smooth' }) 
    useEffect(()=>{window.scrollTo({ top: 0 , behavior: 'smooth'});},[])

    const [showHeaderMenu,setShowHeaderMenu] = useState(0)

    return(
        <div className="bananaPage">
            
            <p style={{display:"none"}} className="covaliustefan">Created by COVALIU STEFAN</p>

            <div className="scrollToUp fa fa-chevron-up" style={{position:"fixed",right:"2px",top:"50%",zIndex:"2",borderBottom:"2px solid black"}} onClick={()=>window.scrollTo({ top: 0 , behavior: 'smooth'})}></div>

            {/* <div className="chatbot" style={{position:"fixed",right:"10px",zIndex:'2',bottom:'5%'}}>ChatBot</div> */}
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

            <div className="body">
                {/* <div className="top" style={{height:"90vh",backgroundColor:'pink',position:"relative",color:"white",background:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.4)),url(${require('./bananaImages/bananasOnTable.png').default})`,backgroundSize:"cover"}}> */}
                <div className="top" style={{height:"90vh",backgroundColor:'pink',position:"relative",color:"white",background:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.4)),url(${require('./bananaImages/bananasOnTable.png')})`,backgroundSize:"cover"}}>
                    <p style={{display:"flex",justifyContent:"center",margin:"0",padding:"20vh 0 10vh 0",alignItems:"center",textAlign:"center",textDecoration:"underline",fontSize:'2em'}}>Cel mai racoros desert din oras</p>
                    <div className="flex" style={{display:"flex",justifyContent:"space-evenly",height:'',fontSize:'',flexWrap:"wrap",alignItems:"baseline"}}>
                        <Link to={"/products"} style={{color:"unset",textDecoration:"none",alignSelf:"flex-end",border:"5px solid white",padding:"5px",margin:"2.5vh 0",backgroundColor:"rgba(0,0,0,0.4)"}}>Vezi meniul nostru</Link>
                        <Link to={"/create"} style={{color:"unset",textDecoration:"none",alignSelf:"flex-end",border:"5px solid white",padding:"5px",margin:"2.5vh 0",backgroundColor:"rgba(0,0,0,0.4)"}}>Creaza-ti propiul desert</Link>
                    </div>
                </div>
                <p style={{textAlign:"center",margin:"50px",fontFamily:"Kaushan Script",fontSize:"1.7em"}}>Avem o poveste interesanta ce merita auzita!</p>
                {/* <div className="story" style={{height:"100%",backgroundColor:"",color:'black',padding:"5vh 5%",background:`linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.8) 40%), url(${require('./bananaImages/backgroundLeaf.png').default})`}}> */}
                <div className="story" style={{height:"100%",backgroundColor:"",color:'black',padding:"5vh 5%",background:`linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.8) 40%), url(${require('./bananaImages/backgroundLeaf.png')})`}}>
                    <div className="flex" style={{display:"flex",justifyContent:"space-between",height:"100%",flexWrap:"wrap",gap:"2.5%"}}>
                        {/* <img src={require('./bananaImages/foodtruck.png').default} alt="" style={{width:"100%",height:"",flex:"1",objectFit:"cover"}}/> */}
                        <img src={require('./bananaImages/foodtruck.png')} alt="" style={{width:"100%",height:"",flex:"1",objectFit:"cover"}}/>
                        <div className="text" style={{flex:"1",minWidth:"30%",display:"flex",justifyContent:'center',alignItems:"center",backgroundColor:"rgba(255,255,255,1)",padding:"0 5%"}}>
                            <div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus nisi cum eaque modi rem soluta illo excepturi nesciunt, perspiciatis vel eveniet corporis laborum numquam nobis, ab pariatur. Tempora, hic consequatur. Adipisci aliquid aspernatur voluptatem vel tenetur deserunt pariatur, quos ut ipsam illo nihil qui accusantium eligendi culpa quisquam fugiat, explicabo exercitationem saepe. Ipsa illo harum totam libero at, hic laboriosam perferendis vel minus! Consequatur placeat perspiciatis necessitatibus excepturi quo culpa libero ad, eos repellendus aperiam tempora quae dolor tempore rem. Vitae doloremque culpa adipisci tempora eveniet ad non dolores inventore saepe fugiat magnam, esse harum minus est itaque, nihil, earum ex beatae corporis vel mollitia ut?</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <ItemBanana topping={"darkChocolate"} candy={"oreo"} shape={"full"}/> */}
                <div className="meniu" style={{backgroundColor:""}}> 
                    <p style={{display:"flex",alignItems:"center",textAlign:"center",justifyContent:"center",margin:"0",height:"20vh",color:"",fontFamily:"Kaushan Script",fontSize:"1.7em"}}>Descopera cele mai indragite produse ale noastre</p>
                    <div className="products" style={{display:"flex",justifyContent:"space-evenly",flexWrap:"wrap"}}>
                        <div style={{backgroundColor:"white",height:'50vh',textAlign:"center",flex:'1',margin:"0 5%",minWidth:"200px"}}>
                            {/* <img style={{height:'70%'}} src={require('./bananaImages/bananasProducts/Untitled1.png').default} alt="" /> */}
                            <img style={{height:'70%'}} src={require('./bananaImages/bananasProducts/Untitled1.png')} alt="" />
                            <p>Banana 1</p>
                            <li>Ciocolata neagra</li>
                            <li>Bomboane</li>
                        </div>
                        <div style={{backgroundColor:"white",height:'50vh',textAlign:"center",flex:'1',margin:"0 5%",minWidth:"200px"}}>
                            {/* <img style={{height:'70%'}} src={require('./bananaImages/bananasProducts/Untitled2.png').default} alt="" /> */}
                            <img style={{height:'70%'}} src={require('./bananaImages/bananasProducts/Untitled2.png')} alt="" />
                            <p>Banana 2</p>
                            <li>Ciocolata neagra</li>
                            <li>Cocos</li>
                        </div>
                        <div style={{backgroundColor:"white",height:'50vh',textAlign:"center",flex:'1',margin:"0 5%",minWidth:"200px"}}>
                            {/* <img style={{height:'70%'}} src={require('./bananaImages/bananasProducts/Untitled3.png').default} alt="" /> */}
                            <img style={{height:'70%'}} src={require('./bananaImages/bananasProducts/Untitled3.png')} alt="" />
                            <p>Banana 3</p>
                            <li>Ciocolata neagra</li>
                            <li>Nuci</li>
                        </div>
                    </div>
                </div>
                <Link to={'/products'} style={{color:"unset",height:"10vh",textDecoration:"underline",display:"flex",justifyContent:"center",alignItems:"center",margin:"0",fontFamily:"",fontSize:"1.1em"}}>Vezi toate produsele</Link>
                {/* <div className="locations">
                    <p style={{display:"flex",justifyContent:"center",margin:"50px",color:""}}>Te asteptam la city park</p>
                    <div class="mapouter" style={{position:"relative",textAlign:"right",height:"500px",width:"600px"}}><div class="gmap_canvas" style={{overflow:"hidden",background:"none",height:"500px",width:"600px"}}><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=constana%20city%20park&t=&z=15&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>
                </div> */}
            </div>

            <div ref={footer} className="footer" style={{backgroundColor:"#262626",margin:"0",padding:"20px 0 5vh 0"}}>
                <p style={{margin:"10px 0 10px 0",color:"white",textAlign:"center"}}>Email: frostybanana22@gmail.com</p>
                <p style={{height:"",margin:"10px 0 10px 0",color:"white",textAlign:"center",display:"flex",justifyContent:"center"}}>
                    <a style={{textDecoration:"none", color:"unset"}} href="https://m.me/SweetDipsRomania" target="_blank" rel="noreferrer">Messenger</a>
                </p>
                <p style={{height:"",margin:"10px 0 10px 0",color:"white",textAlign:"center"}}>© 2023 SweetDips</p>
                <p style={{height:"",margin:"10px 0 10px 0",color:"white",textAlign:"center"}}>Covaliu Stefan-Rebis & Tudor Vlad-Andrei</p>
            </div>

        </div>
    )
}
export default BananaPage;
