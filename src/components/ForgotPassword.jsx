import React, {useState} from "react"
import FormError from "./FormError"
import Navbar from "./Navbar"
import Loading from "./Loading"




const endpoint = "http://localhost:5000"

export default function ForgotPassword(props) {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [email, setEmail] = useState("")
    const [code,setCode] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const changePassword = () => {
        return new Promise(async(resolve) => {

            const response = await fetch(endpoint+"/verifyPassword", {
                method: "POST", 
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    code: code,
                    password: password
                })
                
            })

            resolve(response.json())
        })
    }

    const forgotCall = () => {
        return new Promise(async(resolve) => {
            

            const response = await fetch(endpoint + '/forgotpassword', {
                method: "POST", 
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            })

            resolve(response.json())

        })
    }



    return (

        <>

        <Navbar />

        {(loading) && (
            <Loading />
        )}
        <div className="min-w-[33%] w-fit mx-auto mt-24 p-4 rounded-lg relative" data-theme="forest">
            <FormError error={errorMessage} />
            <p className="font-1 text-xl text-center font-semibold">Request Password Change</p>
            {(currentSlide === 0) && (
                <>
                <div className="w-5/6 mx-auto mt-2 p-3 rounded-lg bg-base-200">
                <p className="font-1 my-1 font-semibold">Enter your account email:</p>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full font-1 font-semibold input-primary" placeholder="me@gmail.com" />

            </div>
            <div className="w-fit mt-2 font-1 font-semibold mx-auto">

                <div className="btn btn-secondary" onClick={() => {
                    setLoading(true)
                    if ((email.length > 0) && (email.length < 100) && (email.split("@").length === 2)) {
                        forgotCall().then((res) => {
                            if (res.code === "err") {
                                setLoading(false)
                                setErrorMessage("You don't have an account")
                                window.location.replace("/signup")
                                console.log(res.message)
                            } else if (res.code === "ok") {
                                setLoading(false)
                                setCurrentSlide(1)
                            } else {
                                setLoading(false)
                                console.log(res)
                            }
                        
                            
                        })
                    } else {
                        setLoading(false)
                        setErrorMessage("Write your email" + "|" + Math.floor(Math.random()*100))
                    }


                    
                }}>
                    <p>Request Change</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
</svg>


                </div>

            </div>
                </>
            )}

            {(currentSlide === 1) && (
                <>
                    <div className="p-5 text-center rounded-lg bg-base-300 mt-4 font-1">
                        <p className="">A code was sent to <span className="font-bold italics">{email}</span></p>
                        <div className="mt-2 flex flex-col bg-base-200 p-4 rounded-lg gap-2">
                            

                            <div className="bg-base-100 p-4 rounded-lg">
                            <p>Enter the code here to confirm you own this account</p>

<input value={code} onChange={(e) => setCode(e.target.value)} type="text" className="input text-center input-secondary font-1 font-semibold" placeholder="Code:" />
<p className="text-sm mt-2">Check your spam :)</p>


                            </div>
                            

                            <div className="p-4 rounded-lg bg-base-300">
                            <p className="font-1 font-semibold">Input your new password here</p>
                            <input value={password} type="password" onChange={(e) => setPassword(e.target.value.trim())} maxLength="15" className="input text-center input-primary font-1 font-semibold" placeholder="New Password:" />
                            
                            </div>
                            <div className="btn btn-accent font-1 font-bold text-lg" onClick={() => {
                                setLoading(true)
                                if ((password.length <= 8) || (password.length > 20)) {
                                    setLoading(false)
                                    setErrorMessage("Password must be between 8 and 20 characters" + "|" + Math.floor(Math.random()*100))
                                } else {

                                    changePassword().then((res) => {
                                        if (res.message === "invalid code") {
                                            setLoading(false)
                                            setErrorMessage("Invalid code" + "|" + Math.floor(Math.random()*100))
                                        } else if (res.code === "err") {
                                            setLoading(false)
                                            setErrorMessage("Something went wrong" + "|" + Math.floor(Math.random()*100))
                                        } else if (res.code === "ok") {
                                            setLoading(false)
                                            setErrorMessage("All went well" + "|" + Math.floor(Math.random()*100))
                                            window.location.replace("/login")
                                        } else {
                                            setLoading(false)
                                            setErrorMessage("Something went wrong" + "|" + Math.floor(Math.random()*100))
                                        }
                                    })

                                }
                            }}>
                                <p>Submit Changes</p>

                            </div>
                            


                            
                        </div>

                    </div>
                    
                </>
            )}

            







        </div>




        </>
    )
}