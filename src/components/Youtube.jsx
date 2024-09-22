import React, {useEffect} from "react"
import Index from "./Index"





const endpoint = "http://localhost:5000"

export default function Youtube(props) {

    const callAdvertising = () => {
        return new Promise(async(resolve) => {
            const response = await fetch(endpoint + "/marketing", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    source: props.source
                })
            })
            resolve(response.json())

        })
    }



    useEffect(() => {
        callAdvertising().then((res) => {
            window.location.replace("/")
        })
    }, [])

    

    return (

        <>

            


        </>
    )



}