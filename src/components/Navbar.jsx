import React from "react"
import { FaBars } from "react-icons/fa";



export default function Navbar(props) {





    return (
        
        <>


        <div className="navbar sticky top-0 left-0 w-full p-5 bg-base-300 z-10" data-theme="forest">
            <div className="flex-1">
                <a href="/" className="btn btn-primary btn-ghost btn-lg">
                    <p className="font-1 text-4xl font-bold">incepta</p>
                </a>
               
            </div>

            <div className="flex-0 sm:block hidden">
                <div className="w-full font-2 text-2xl flex flex-row gap-4 items-center justify-items-center"> 
                    {/* <div className="btn btn-ghost">
                        <p>About us</p>
                    </div> */}
                    {/* <div className="btn btn-ghost">
                        <p>What we do</p>
                    </div> */}

                    
                    <a href="/login" className="btn btn-primary font-1 text-lg btn-outline">
                        <p>Login</p>
                    </a>
                    <a href="/signup" className="btn btn-accent font-1 text-lg">
                        <p>Signup</p>
                    </a>
            
                 
                    
                </div>
            </div>

            <div className="flex-0 sm:hidden block">
                <div class="dropdown dropdown-bottom dropdown-end">
                    <div tabindex="0" role="button" class="btn m-1"><FaBars /></div>
                        <ul tabindex="0" class="dropdown-content gap-2 menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {/* <li className=""><a className="font-2 font-bold">About Us</a></li> */}
                            {/* <li className=""><a className="font-2 font-bold">What we do</a></li> */}
                            {/* <li className=""><a className="font-2 font-bold">Pricing</a></li> */}

                            <li className=""><a href="/main" className="font-2 font-bold  text-white hover:bg-primary hover:text-black border-2 border-primary">Login</a></li>
                            <li className=""><a href="/signup" className="font-2 font-bold  text-white hover:bg-accent hover:text-black border-2 border-accent">Signup</a></li>
                        </ul>
                    </div>
            </div>
        </div>



        




        </>
    )
}


