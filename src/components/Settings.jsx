import React, {useContext, useState, useEffect} from "react"
import LogNav from "./LogNav"
import { UserContext } from "./Contexts"
import FormError from "./FormError"
import Loading from "./Loading"
const endpoint =  "http://localhost:5000"
export default function Settings(props) {


    


    const users = useContext(UserContext)
    const [grade,setGrade] = useState(users.grade)
    const [name, setName] = useState(users.name)
    const [bio, setBio] = useState(users.bio)
    const [loading, setLoading] = useState(false)
    const [paymentLink, setPaymentLink] = useState(users.paymentLink)
    const [errorMessage, setErrorMessage] = useState("")
    const [bioLength, setBioLength] = useState(0)


   


    const processForm = () => {
        return new Promise(async(resolve) => {
            let response
            if (!users.student) {
                response = await fetch(endpoint + "/updateProfile", {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        grade: grade,
                        bio: bio
                    })
                })
            } else {
                response = await fetch(endpoint + "/updateProfile", {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        grade: grade,
                    })
                })
            }
            

            

            resolve(response.json())
        })
    }


    


    useEffect(() => {
        if (bio !== undefined) {
            setBioLength(bio.length)
        }


    },[bio])


    const submitForm = () => {

        let passedForm = true;
        setLoading(true)
        if (!users.student) {
            if ((bio.length < 20) || (bio.length > 600)) {
                passedForm = false
                setErrorMessage("Bio must be between 20 and 600 characters"  + "|" + Math.floor(Math.random()*100))
            } 
        }
        if (name.length < 1) {
            passedForm = false
            setErrorMessage("Enter your name" + "|" + Math.floor(Math.random()*100))
        } else if (name.length > 40) {
            passedForm = false
            setErrorMessage("Name is too long" + "|" + Math.floor(Math.random()*100))
        }

        if (passedForm) {
            processForm().then((res) => {
                setLoading(false)
                if (res.code === "err") {
                    console.log(res)
                    setErrorMessage("Something went wrong" + "|" + Math.floor(Math.random()*100))
                } else if (res.code === "ok") {
                    
                    setErrorMessage("Your profile has updated" + "|" + Math.floor(Math.random()*100))


                } else {
                    console.log(res)
                    setErrorMessage("Something went wrong" + "|" + Math.floor(Math.random()*100))
                }
            })
        } else {
            setLoading(false)
        }




    }



    const changeLink = () => {
        return new Promise(async(resolve) => {
            
            const response = await fetch(endpoint + '/addPayment', {
                method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        paymentLink: paymentLink
                    })
             })
             resolve(response.json())
        })
    }


   
    

    return (
        <>
        {(loading) && (
            <Loading />
        )}
        <div className=" lg:p-5 p-2 bg-base-200 w-full" data-theme="forest">
            <p className="font-2 font-bold text-2xl">Settings</p>
            <div className="p-4 rounded-lg bg-base-300 mt-2">
                <p className="font-1 font-semibold">Basic Info:</p>
                <div className="grid lg:grid-cols-2 w-fit gap-2 mt-3 relative">
                        <FormError error={errorMessage} />
                        <div className="flex flex-col gap-2">
                        <div className="p-3 bg-base-200 rounded-lg">
                            <p className="font-2 ml-2 font-bold text-lg">Name:</p>
                            <input value={name} className="input input-primary font-1 font-semibold" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="p-3 bg-base-200 rounded-lg w-full">
                            <p className="font-2 ml-2 font-bold text-lg">Grade:</p>
                            <select className="select select-primary font-1 font-semibold" value={grade} onChange={(e) => setGrade(e.target.value)}>
                                <option value="9">Freshman</option>
                                <option value="10">Sophomore</option>
                                <option value="11">Junior</option>
                                <option value="12">Senior</option>
                            </select>
                        </div>
                        <div className="p-3 bg-base-200 rounded-lg">
                            <p className="font-2 ml-2 font-bold text-lg">Email:</p>
                            <input disabled className="input input-disabled font-1 font-semibold"  value={users.email} />
                        </div>
                        </div>


                {(!users.student) && (
                    <div className="p-3 bg-base-100 w-fit rounded-lg font-1">
                        <p className="font-bold text-lg ml-2 mb-1">Bio:</p>
                        <div className="relative select-none ">
                            <div className="absolute bottom-0 right-0 p-2 bg-base-300 text-sm rounded-full">
                                {bioLength}/150

                            </div>

                            <textarea maxLength="150" className="textarea textarea-secondary font-semibold textarea-lg" onChange={(e) => setBio(e.target.value)} placeholder="Write your bio here..." value={bio} />
                        </div>
                        
                    </div>
                )}
                <div className="lg:col-span-2">
                    <div className="btn btn-secondary w-full font-1 font-semibold text-lg" onClick={submitForm}>
                        <p>Change Profile</p>

                    </div>

                </div>

                </div>
                

            </div>
            {(!users.student) && (
                
                <div className="p-4 rounded-lg bg-base-300 mt-2">
                <p className="font-1 font-semibold text-xl">Payout Info:</p>


                <div className="mt-2 flex lg:flex-row flex-col lg:p-10 gap-2 ">
                    <div className="bg-base-100 w-full lg:p-8 rounded-lg p-2">

                        <p className="font-1 font-semibold text-lg">Link your payment info</p>
                        <div className="p-4 rounded-lg bg-base-300 mb-4">
                            <p className="font-2 font-semibold">Add your <b>Paypal.me </b>link</p>
                            <div className="join-vertical join mt-2">
                            <input value={paymentLink} onChange={(e) => {
                                setPaymentLink(e.target.value)
                            }} type="text" className="text-center input input-secondary font-1 join-item" placeholder="Ex: paypal.me/myName" />
                            <div className="btn btn-accent join-item" onClick={(e) => {

                                if (users.paymentLink === paymentLink) {
                                    setErrorMessage("Same payment link as on file"  + "|" + Math.floor(Math.random()*100))
                                } else if (paymentLink.length < 5) {
                                    setErrorMessage("Invalid payment link"  + "|" + Math.floor(Math.random()*100))
                                } else {
                                    changeLink()
                                }

                                

                            }}>
                                <p className="font-1 font-bold">Add your link</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
</svg>


                            </div>
                            </div>
                            

                        

                        </div>


                        <p className="font-2 text-lg font-semibold">Amount Earned</p>
                        <div className="p-4 bg-base-300 rounded-lg mb-2">
                        <p className="font-1 p-2 bg-neutral w-fit rounded-lg font-bold text-lg mb-2">${users.amountEarned.toFixed(2)}</p>
                        <div className="flex flex-row items-center justify-items-center gap-2 font-1">
                            <p>$0.00</p>
                        <progress class="progress w-56 progress-primary" value={users.amountEarned} max="50"></progress>
                            <p>$50.00</p>
                        </div>
                        </div>
                        
                        {(users.amountEarned < 50) && (
                            <>
                            <p className="font-1 text-sm text-error">You can't cashout until you have earned $50</p>
                            <div className="btn btn-primary btn-disabled ml-2 mt-2 btn-outline font-1">
                            Cashout
                        </div>
                            </>
                            
                        )}
                        {(users.amountEarned > 50) && (
                            <div className="btn btn-primary ml-2 mt-2 btn-outline font-1">
                            Cashout
                        </div>
                        )}
                        
                        
                        

                    </div>
                    <div className="bg-base-100 w-full p-8 rounded-lg hidden">
                        <p className="font-2 text-lg font-semibold">Account Termination</p>
                        <p className="font-1 text-sm">This action is <b>permanent </b>and is <b>irreversible</b></p>
                        <div className="btn btn-error font-1 btn-outline mt-2">
                            <p>Delete Account</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
</svg>

                        </div>
                    </div>

                </div>
            </div>
            )}
            
                
            
            



        



        </div>
    
        </>

    )
     
}