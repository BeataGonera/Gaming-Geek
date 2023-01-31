import { createContext, ReactElement, FC, useReducer } from "react"

type State = {
    user: any;    
}

type Action = {
    type: string;
    payload: any;
}


interface AuthContextProviderProps{
    children: ReactElement;
}

const initialState = { 
        user: null
 }

export const AuthContext = createContext<{
    dispatch: React.Dispatch<Action>;
    user: any;
}>({
    dispatch: () => null,
    user: null
})

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