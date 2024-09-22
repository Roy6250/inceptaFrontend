 import React, {useState, useEffect} from "react"



let timeout;

export default function FormError(props) {
    // if the same error occurs more than once, then the prop wont change and therefore it won't trigger the message useState.
    const [message, setMessage] = useState("")

    useEffect(() => {

        setMessage(props.error)

    },[props.error])
    

    useEffect(() => {
        console.log(message.split("|"))
        if (message.split("|")[0] !== "") {
            timeout = setTimeout(() => {
                setMessage("")
            }, 3000)
        }

        return () => {
            clearTimeout(timeout)
        }        
    },[message])







    return (

        <>

        {(message.split("|")[0] !== "") && (
            <div className="absolute p-3 z-40 rounded-lg bg-error left-[50%] translate-x-[-50%]" data-theme="forest">
                <p className="text-center text-lg font-semibold text-white">{message.split("|")[0]}</p>
            </div>

        )}
        

        </>
        
    )
}

