import { useEffect, useRef ,useState} from "react"
import gsap from "gsap"
import { Link } from "react-router-dom"


export default function Landing(){
  
    const interval=useRef(null)
    useEffect(()=>{
        
        const buttons=document.querySelectorAll("button")
        const blogger=document.querySelector("h1")

        const handlemouseenter=(e)=>{
            gsap.to(e.target,{backgroundColor:"#2563eb",duration:1})
        }
        const handlemouseleave=(e)=>{
            gsap.to(e.target,{backgroundColor:"black",duration:1})
        } 
        buttons.forEach(button => {
            button.addEventListener('mouseenter',handlemouseenter)
            button.addEventListener('mouseleave',handlemouseleave)
        });
        const handleBloggerMouseEnter = () => {
            gsap.to(blogger, {
              color: getRandomColor(),
              duration: 0.3,
              
            });
          };
      
          const handleBloggerMouseLeave = () => {
            gsap.to(blogger, {
              color: "#2563eb", // Reset to default blue color
              duration: 0.3,
            });
          };
      
          const getRandomColor = () => {
            const colors = ["red", "green", "coral", "darkorchid", "brown"];
            return colors[Math.floor(Math.random() * colors.length)];
          };
          blogger.addEventListener("mouseenter", handleBloggerMouseEnter);
          blogger.addEventListener("mouseleave", handleBloggerMouseLeave);
      
          

        return()=>{
            buttons.forEach(button=>{
                button.removeEventListener('mouseenter',handlemouseenter)
                button.removeEventListener('mouseleave',handlemouseleave)
            })
            blogger.removeEventListener("mouseenter", handleBloggerMouseEnter);
            blogger.removeEventListener("mouseleave", handleBloggerMouseLeave);
        }
    },[])

    return(
        <>
        <div className="relative h-screen">
            <div className="grid grid-cols-1 md:grid-cols-4 h-screen box z-20">
                <div className="flex flex-col items-center justify-center col-span-3 text-justify">
                    <h1 className="font-black text-blue-600 text-8xl blogger">BLOGGER</h1>
                    <h3 className="text-7xl">Blogging made <span className="text-blue-600 font-extrabold">EASY</span></h3>
                </div>
                <div className="flex flex-col space-y-4 absolute top-1/2 right-1/4 gap-5 transform -translate-y-1/2 ">
                    <Link to="/main"><button className="bg-black px-5 py-3 text-white rounded-lg w-full">Home</button></Link>
                    <Link to='/login'><button className="bg-black px-5 py-3 rounded-lg text-white w-full">Login</button></Link>
                </div>
                
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
      </div>
      </div>
            
        </>
    )
}