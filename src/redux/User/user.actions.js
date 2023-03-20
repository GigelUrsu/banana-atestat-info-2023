import { auth, GoogleProvider, handleUserProfile } from "../../firebase/utils";
import userTypes from "./user.types";
import {signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const setCurrentUser = user =>({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const logOut = () =>{
    signOut(auth)
};

export const resetAllSuccessStates = () =>({
    type: userTypes.RESET_ALL_SUCCESS_STATES
});

export const signInUser = ({email, password}) => async dispatch => {
    try {
        await signInWithEmailAndPassword(auth,email,password)
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });
    } catch (err) {
        console.log(err)
    }
};

export const signUpUser = ({displayName ,email, password, confirmPassword}) => async dispatch => {
    if(password !== confirmPassword){
        const err = 'Passowrd Don\'t match';
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        });
        return;
    }
    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        await handleUserProfile(user, {displayName})
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        });
    } catch (err) {
        console.log(err)
    }
};

export const signInWithGoogle = () => async dispatch => {
    try {
        // console.log('sign in with google started')
       await signInWithPopup(auth,GoogleProvider)
       .then(() =>{
        //    console.log("googlesign in")
        //    console.log(auth.currentUser)
        // console.log('sign in with google finished')
           dispatch({
               type: userTypes.SIGN_IN_SUCCESS,
               payload: true
           });
       });
    } catch (err) {
        //  console.log(err)
        //  console.log('sign in with google finished')
    }
};