import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { fetchFromAPI } from "../../helpers";
import {useSelector} from 'react-redux';
import "./stripe-checkout_css.css";

const mapState = ({user, cart}) =>({
    currentUser: user.currentUser,
    cartItemsArray: cart.cartItemsArray
});

const StripeCheckout=()=>{
    const [email,setEmail]=useState('');
    const {currentUser, cartItemsArray} = useSelector(mapState);
    const stripe = useStripe();

    const [showLoading,setShowLoading] = useState(0);

    function toObject(arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
          rv[arr[i].productId] = arr[i].quantity;
        return rv;
      }

    async function handleGuestCheckout(e){
        e.preventDefault();
        const line_items = currentUser? await currentUser["cart"] : toObject(cartItemsArray)

        if(!Object.keys(line_items).length)return setShowLoading(0);
        // fetch('https://payserverfornetlify.netlify.app/.netlify/functions/hi')
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log(data)
        // })
        // .catch((err) => {
        //     console.log("Error: ", err)
        // })

        const response = await fetchFromAPI('.netlify/functions/create-checkout-session',{
            body: { line_items, customer_email: email },
        });
        console.log(response)
        const { sessionId } = await response; 
        console.log(sessionId)
        const {error} = await stripe.redirectToCheckout({
            sessionId
        });
        if(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(currentUser)
        setEmail(currentUser.email)
    },[currentUser])

    return (
        <form className="stripeCheckout" onSubmit={(e)=>handleGuestCheckout(e)}>
            {showLoading?<div className="loading">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>:''}
            <div className="email">
                <input required type='email' onChange={e => setEmail(e.target.value)} placeholder='Email' value={email} className="emailInput"/>
            </div>
            <div className="checkout" onClick={()=>setShowLoading(1)}>
                <button type="submit" className="submitButton">
                    Checkout
                </button>
            </div>
        </form>
    )
}

export default StripeCheckout