import React, { createContext, ReactElement, FC, useReducer, useEffect } from "react"
import { auth } from "../firebase/config";


type State = {
    user: any;
    authIsReady: boolean;
}

type Action = {
    type: string;
    payload: any;
}

interface AuthContextProviderProps{
    children: ReactElement;
}

const initialState = { 
    user: null, 
    authIsReady: false
}

export const AuthContext = createContext<{
    dispatch: React.Dispatch<Action>;
    user: any;
    authIsReady: boolean;
}>({
    dispatch: () => null,
    user: null, 
    authIsReady: false
})

export const authReducer = (state:State, action:Action) => {
    switch (action.type){
        case 'LOGIN':
            return{...state, user: action.payload}

        case 'LOGOUT':
                return{...state, user: null}
        
        case 'AUTH_IS_READY':
                return{...state, user: action.payload, authIsReady: true}

        default: 
                return state
        }
    }

export const AuthContextProvider:FC<AuthContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user)=> {
            dispatch({type: 'AUTH_IS_READY', payload: user})
            unsubscribe()
        })
    },[])

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

