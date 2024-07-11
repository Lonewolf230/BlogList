import { createContext,useEffect,useState } from "react";

const AuthContext=createContext()

export function AuthProvider({children}){

    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const [loggedIn,setLoggedIn]=useState(()=>{
        const token=localStorage.getItem('token')
        return token? true:false
    })

    useEffect(()=>{
        const token=localStorage.getItem('token')
        setLoggedIn(token? true:false)
    },[])

    const logIn=(token)=>{
        localStorage.setItem('token',token)
        setLoggedIn(true)
    }

    const logOut=()=>{
        localStorage.removeItem('token')
        setLoggedIn(false)
    }
    return(
        <AuthContext.Provider value={{loggedIn,logIn,logOut,setError,setLoading,loading,error}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext