import userTypes from "./user.types";

const INITIAL_STATE = {
    currentUser:null,
    signInSuccess: false,
    signUpSuccess: false,
    signUpError:[]
}

const userReducer =(state=INITIAL_STATE, action) => {
    switch(action.type){
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case userTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                signInSuccess: action.payload
            }
        case userTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                signUpSuccess: action.payload
            }
        case userTypes.SIGN_UP_ERROR:
            return{
                ...state,
                signUpError: action.payload
            }
        case userTypes.RESET_ALL_SUCCESS_STATES:
            return{
                ...state,
                signInSuccess: false,
                signUpSuccess: false,
                signUpError: []
            }
        default:
            return state;
    }
}

export default userReducer;