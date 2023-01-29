import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {

    const context = useContext(AuthContext)

    if(context === undefined){
        throw Error('out of context scope')
    }

    return context
}