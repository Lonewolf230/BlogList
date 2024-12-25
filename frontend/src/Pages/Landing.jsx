import { useEffect, useRef ,useState} from "react"
import gsap from "gsap"
import { Link } from "react-router-dom"
import Login from "./Login"


export default function Landing(){
  
    const interval=useRef(null)
    

    return(
        <>
        <div className="relative h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 h-screen box z-20">
                <div className="flex flex-col items-center justify-center text-justify">
                    <h1 className="font-black text-blue-600 text-8xl blogger">BLOGGER</h1>
                    <h3 className="text-7xl">Blogging made <span className="text-blue-600 font-extrabold">EASY</span></h3>
                </div>
                <div className="flex items-center justify-center">
                    <Login/>
                </div>
                
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
      </div>
      </div>
            
        </>
    )
}