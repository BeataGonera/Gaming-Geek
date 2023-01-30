import { createContext, useReducer, FC, ReactElement } from "react"

interface ThemeContextState{
    color: string;
    changeColor: (color: string) => void;
}

interface ThemeProviderProps {
    children: ReactElement
}

const defaultThemeContextValue = {} as ThemeContextState

export const ThemeContext = createContext(defaultThemeContextValue)

export const themeReducer = (state:any, action:any) => {
    switch(action.type){
        case 'CHANGE_COLOR':
            return {...state, color: action.payload}
        default:
            return state
    }

}

export const ThemeProvider:FC<ThemeProviderProps> = ({children}) => {

    const [state, dispatch] = useReducer(themeReducer, {
        color: '#5E0060'
    })

    const changeColor = (color:string) => {
        dispatch({type: 'CHANGE_COLOR', payload: color})
    }


    return (
        <ThemeContext.Provider value={{...state, changeColor}}>
            {children}
        </ThemeContext.Provider>
    )
}