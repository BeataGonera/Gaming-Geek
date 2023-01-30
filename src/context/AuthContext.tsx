import { createContext, ReactElement, FC, useReducer } from "react"

interface State{
    user: string;
}

interface AuthContextProviderProps{
    children: ReactElement;
}


const initialState: State = { user: 'beata' }

export const AuthContext = createContext<{
    state: State;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
})

export const authReducer = (state:any, action:any) => {
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

    const [state, dispatch] = useReducer(authReducer, {
        initialState
    }
    )

    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}