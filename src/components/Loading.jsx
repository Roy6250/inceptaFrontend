import React from "react"



import { FaSpinner } from "react-icons/fa";




export default function Loading(props) {



    // console.log()
    return (

        <div className="fixed w-screen h-screen opacity-75 bg-base-300 z-50">
            <div className="w-full h-full relative">
            <div className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
                <FaSpinner className="size-24 animate-spin" />
            </div>

            </div>
            





        </div>
    )
}
