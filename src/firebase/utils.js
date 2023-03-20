import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc, getDocs, updateDoc, collection, query, where, increment, deleteField, arrayRemove, arrayUnion } from "firebase/firestore"
import {getAuth, GoogleAuthProvider } from "firebase/auth"
import {firebaseConfig} from './config';
initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
// connectFirestoreEmulator(firestore, 'localhost', 8080);

export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt:'select_account'});
// export const signInWithGoogle = () => signInWithPopup(auth, GoogleProvider).then((result) => {
//     const user = result.user;
//     console.log("from firebase/utils.js")
//     console.log(user)
//   }).catch((error) => {
//     const errorMessage = error.message;
//     console.log(errorMessage)
//   });

export const handleUserProfile = async (userAuth, additionalData) =>{
    console.log(`HANDLE USER PROFILE ${!userAuth?"NO USER":""}`)
    if(!userAuth) return ;
    const {uid}=userAuth;
    const userRef = doc(firestore, "users",`${uid}`);
    // const snapshot = await userRef.get();
    const snapshot = await getDoc(userRef)
    // console.log(snapshot["_document"]["data"]["value"]["mapValue"]["fields"])
    if(!snapshot.exists()){
        const moreUserInfoRef = doc(firestore, "users",`${uid}`,"moreUserInfo","cartItems");
        console.log("HANDLE USER PROFILE CREATE USER")
        const {displayName,email}=userAuth;
        const timestamp = new Date();
        try{
            await setDoc(userRef,{
                displayName:displayName,
                email:email,
                creationDate:timestamp,
                uid:uid,
                favorites:[],
                cart:{},
                ...additionalData
            })
            await setDoc(moreUserInfoRef,{},{merge:true})
        }catch(err){
            console.log(err)
        }
    }
    return userRef;
} 

export const handleFetchProducts = async(filters) => {
    console.log("HANDLE FETCH PRODUCTS")
    // console.log(filters)
    return new Promise((resolve,reject)=>{
        let ref = collection(firestore,"items");
        const queryConstraints = [
            ...filters.category ? [where("category", filters["category"]["operator"], filters["category"]["value"])]: [], 
            ...filters.gen ? [where("gen", filters["gen"]["operator"], filters["gen"]["value"])]: [],
            ...filters.color ? [where("color", filters["color"]["operator"], filters["color"]["value"])]: [],
            ...filters.brand ? [where("brand", filters["brand"]["operator"], filters["brand"]["value"])]: [],
            ...filters.onSale ? [where("onSale", filters["onSale"]["operator"], filters["onSale"]["value"])]: [],
            ...filters.name ? [where("name", filters["name"]["operator"], filters["name"]["value"])]: [],
            ...filters.size ? [where(`size.${filters["size"]["value"]}`, filters["size"]["operator"], true)]: [],
            ...filters.keywords ? [where(`keywords.${filters["keywords"]["value"]}`, filters["keywords"]["operator"], 0)]: [],
            ...filters.id ? [where("id", filters["id"]["operator"], filters["id"]["value"])]: [],
            ...filters.groupId ? [where("groupId", filters["groupId"]["operator"], filters["groupId"]["value"])]: [],
            ...filters.primaryInGroup ? [where("primaryInGroup", filters["primaryInGroup"]["operator"], filters["primaryInGroup"]["value"])]: [],
            // ...filters.price1 ? [where("price", filters["price1"]["operator"], parseFloat(filters["price1"]["value"]))]: [],
            // ...filters.price2 ? [where("price", filters["price2"]["operator"], parseFloat(filters["price2"]["value"]))]: []
        ]
        if(filters) ref = query(ref, ...queryConstraints)
        getDocs(ref).then(snapshot=>{
            const productsArray = [...snapshot.docs.map(doc =>{
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            })]
            resolve(productsArray);
        }).catch(err => {
            reject(err);
        })
    })
}

//PENTRU CARTUL DIN USER
export const handleFetchCart = async (userAuth) =>{
    console.log(`HANDLE FETCH CART ITEMS ${!userAuth?"NO USER":""}`)
    return new Promise((resolve,reject)=>{
        if(!userAuth) reject("No user") ;
        const arr =[...Object.keys(userAuth.cart)]
        resolve([arr,userAuth.cart])
    })
} 

//PENTRU CARTUL DIN USER
export const handleUpdateCart = async (userAuth,itemId,incrementValue) =>{
    console.log(`HANDLE UPDATE CART ${!userAuth?"NO USER":""}`)
    if(!userAuth) return ;
    const {uid}=userAuth;
    const userRef = doc(firestore, "users",`${uid}`);
    const snapshot = await getDoc(userRef)
    if(snapshot.exists()){
        const data = snapshot.data()
        if(itemId==="clearCart"){
            console.log("RESET CART")
            await updateDoc(userRef, {
                'cart': {}
            }); 
        }
        else if(data["cart"][itemId] + incrementValue <= 0 || incrementValue===0){
            await updateDoc(userRef, {
                [`cart.${itemId}`]: deleteField()
            });
        }else{
            await updateDoc(userRef, {
                [`cart.${itemId}`]: increment(incrementValue||1)
            }); 
        }
        // console.log("HANDLE UPDATE CART")
        return data;
    }
    return []
} 

export const handleUpdateFavorites = async (userAuth,itemId) =>{
    console.log(`HANDLE UPDATE FAVORITES ${!userAuth?"NO USER":""}`)
    if(!userAuth) return ;
    const {uid}=userAuth;
    const favRef = doc(firestore, "users",`${uid}`);
    if(userAuth.favorites.includes(itemId)){
        await updateDoc(favRef, {
            favorites: arrayRemove(itemId)
        });
    } else {
        await updateDoc(favRef, {
            favorites: arrayUnion(itemId)
        });
    }
    return userAuth;
}

export const handleFetchTransactions = async(filters) => {
    console.log("HANDLE FETCH TRANSACTIONS")
    return new Promise((resolve,reject)=>{
        let ref = collection(firestore,"transactions");
        const queryConstraints = [
            ...filters.email ? [where("customer_details.email", filters["email"]["operator"], filters["email"]["value"])]: [],
        ]
        if(filters) ref = query(ref, ...queryConstraints)
        getDocs(ref).then(snapshot=>{
            const transactionsArray = [...snapshot.docs.map(doc =>{
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            })]
            resolve(transactionsArray);
        }).catch(err => {
            reject(err);
        })
    })
}

export const handleBananaOrder = async (email,phone,city,street,items,price) =>{
    console.log(`HANDLE BANANA ORDER`)
        const timestamp = new Date();
        const orderRef = doc(firestore, "bananaOrders",`${timestamp}`);
        try{
            await setDoc(orderRef,{
                email:email,
                phone:phone,
                city:city,
                street:street,
                finished:false,
                timestamp:timestamp,
                items:items,
                price:price,
                paid:"none" //card || cash || none
            })
            return true;
        }catch(err){
            console.log(err)
        }
    return false;
} 

//*** PENTRU CARTUL COLECTIA DIN USER ***
// export const handleFetchCart2 = async (userAuth) =>{
//     console.log("HANDLE FETCH CART ITEMS")
//     return new Promise((resolve,reject)=>{
//         if(!userAuth) reject("No user") ;
//         const {uid}=userAuth;
//         const cartRef = doc(firestore, "users",`${uid}`,"moreUserInfo","cartItems");
//         getDoc(cartRef).then(snapshot=>{
//             // const arr =[...Object.keys(snapshot["_document"]["data"]["value"]["mapValue"]["fields"])]
//             const arr =[...Object.keys(snapshot.data())]
//             resolve([arr,snapshot.data()])
//         }).catch(err => {
//             reject(err);
//         })
//     })
// } 

//*** PENTRU CARTUL COLECTIA DIN USER *** 
// export const handleUpdateCart2 = async (userAuth,itemId,incrementValue) =>{
//     console.log("HANDLE UPDATE CART")
//     if(!userAuth) return ;
//     const {uid}=userAuth;
//     const cartRef = doc(firestore, "users",`${uid}`,"moreUserInfo","cartItems");
//     const snapshot = await getDoc(cartRef)
//     if(snapshot.exists()){
//         const data = snapshot.data()
//         if(data[itemId] + incrementValue <= 0 || incrementValue===0){
//             await updateDoc(cartRef, {
//                 [itemId]: deleteField()
//             });
//         }else{
//             await updateDoc(cartRef, {
//                 [itemId]: increment(incrementValue||1)
//             }); 
//         }
//         // console.log("HANDLE UPDATE CART")
//         return data;
//     }
//     return []
// } 


//*** FILTRE ***
//price@, sale@                         <=  => 
//name*, gen*, color, brand*, size*     == !=
//category*                             array-include
//order by points  && * = primaryInGroup && @ = 1/group
/*
filters={
    "category":{"operator":"","value:""}, operator : array-include
    "gen":{"operator":"","value":""}, operator : =
    "price":{"operator":"","value":""}, operator : <= >= (in app filter)
    "sale":{"operator":"","value":""}, operator : ==
    "name":{"operator":"","value":""}, operator : ==
    "color":{"operator":"","value":""}, operator : ==
    "brand":{"operator":"","value":""}, operator : ==
    "size":{"operator":"","value":""} operator : exists
}
*/