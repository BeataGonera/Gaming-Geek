import React, { createContext, ReactElement, FC, useReducer } from "react"

enum ActionTypes{
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT' 
}

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
    state: State;
    dispatch: React.Dispatch<Action>
}>({
    state: initialState,
    dispatch: () => {}
})

export const authReducer = (state:State, action:Action) => ({ 
    user: userReducer(action), 
    authIsReady: authIsReadyReducer(action)
})

export const userReducer = (action:Action) => {
    return action.payload
}

export const authIsReadyReducer = (action:Action) => {
    return action.type == 'LOGIN'
}

export const AuthContextProvider:FC<AuthContextProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState)

    return(
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}