import { createContext, ReactElement, FC, useReducer } from "react"

type State = {user: null}

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
    user:any;
}>({
    dispatch: () => null,
    user: null
})

// Property 'state' is missing in type '{ dispatch: React.Dispatch<Action>; user: any; }' but required in type '{ state: State; dispatch: Dispatch<any>; }'.

export const authReducer = (state:State, action:Action) => {
    switch (action.type){
        case 'LOGIN':
            return{...state, user: action.payload}
        
        case 'LOGOUT':
            return{...state, user: null}

        default: 
            return state
    }
}

export const AuthContextProvider:FC<AuthContextProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, initialState)

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}