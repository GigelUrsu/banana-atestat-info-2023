import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import {useDispatch} from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';
import { onSnapshot } from "firebase/firestore";
import BananaPage from './bananaComponents/bananaPage';
import BananaPageProducts from './bananaComponents/bananaPageProducts';
import BananaCreateProduct from './bananaComponents/bananaCreateProduct';
import BananaCheckout from './bananaComponents/bananaCheckout';

function App(){
  
  const dispatch = useDispatch();

  useEffect(()=>{
    const authListener = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        console.log("USE EFFECT USER EXISTS")
        const userRef = await handleUserProfile(userAuth);
        const unsub = onSnapshot(userRef, (snapshot) =>{
          dispatch(setCurrentUser({
            ...snapshot.data()
          }));
        })
        return () =>{
          console.log("UNSUBSCRIBE SNAPSHOT") 
          unsub()
        }
      }
      console.log("USE EFFECT USER DOESNT EXISTS")
      dispatch(setCurrentUser(userAuth))
    });
    return () =>{
      console.log("UNSUBSCRIBE AUTH LISTENER") 
      authListener();
    };
  },[dispatch])

  return (
      <BrowserRouter> 
      <Routes>  
      <Route path="/" element={<BananaPage/>}/>
      <Route path="/products" element={<BananaPageProducts/>}/>
      <Route path="/create" element={<BananaCreateProduct/>}/>
      <Route path="/checkout" element={<BananaCheckout/>}/>
      <Route path="*" element={<Link to='/'>404 Not Found! Home</Link>}/>
      </Routes>
      </BrowserRouter>
  );
  
}

export default App

