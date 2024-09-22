import React, {useState, useEffect, useContext} from "react"
import {UserContext} from "./Contexts"
import LogNav from "./LogNav"



const endpoint = "http://localhost:5000"
export default function Messaging(props) {
    const [contacts, setContacts] = useState([])
    const user = useContext(UserContext)
    const [activeContact, setActiveContact] = useState(null)

    const [messageText, setMessageText] = useState("")





    useEffect(() => {








    }, [activeContact])


    
    const [messages, setMessages] = useState([])

    const callFeed = () => {
        return new Promise(async(resolve) => {
            const headers = {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
              }

              const response = await fetch(endpoint + "/getFeed", headers)
              resolve(response.json())
        })
    }
    
    const callMessages = () => {
        return new Promise(async(resolve) => {
            const headers = {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    person: contacts[activeContact].uuid
                })
            }

            const response = await fetch(endpoint + "/getMessages", headers)
            resolve(response.json())

            
        })
    }

    useEffect(() => {
        if (activeContact !== null) {


            callMessages().then((res) => {
                if (res.code === "err") {
                    // window.location.replace("/login")
                } else if (res.code === "ok") {

                    setContacts((prevContacts) => {
                        let newContacts = prevContacts


                        newContacts[activeContact].messages = 0
                        return newContacts

                    })



                    setMessages(res.message)

                    


                } else {
                    // window.location.replace("/login")
                }
            })
        }

    },[activeContact])





    useEffect(() => {
        callFeed().then((res) => {
            if (res.code === "err") {
                window.location.replace("/login")
            } else if (res.code === "ok") {
                let newContacts = []
                res.message.map((contact) => {  
                    console.log("current contact", contact)
                    for (let i=0; i<props.contacts.length; i++) {
                        if (contact.uuid === props.contacts[i].uuid) {
                            newContacts.push({...props.contacts[i], messages: contact.messageLength})
                        }
                    }
                })
                console.log("new contacts type shit", newContacts)

                setContacts(newContacts)
                
            } else {
                window.location.replace("/login")
            }
        })



        
    }, [props.contacts])



    const sendMsg = () => {
        return new Promise(async(resolve) => {

            const headers = {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: messageText,
                    receiver: contacts[activeContact].uuid,
                })
            } 
            
            const response = await fetch(endpoint + "/sendmessage", headers)
            resolve(response.json())




        })

    }


    const sendMessage = () => {

        // send via ws
        
        if ((messageText.length > 0) && (messageText.length < 1000)) {
            sendMsg().then((res) => {
                if (res.code === "err") {
                    // window.location.replace("/login")
                } else if (res.code === "ok") {
                    setMessages((prevMessages) => {
                        let newMessages = prevMessages
                        
                            return [{
                                sender: "me",
                                receiver: contacts[activeContact].uuid,
                                message: messageText,
                                timestamp: Date.now()
                            },...newMessages]
                
                        
                        
            
            
                        
            
                    })
                    setMessageText("")
                } else {
                    // window.location.replace("/login")
                }
            })
            

        }
    
        
    }
    
    useEffect(() => {
        setMessages((prevMessages) => {
            let newMessages = prevMessages

            newMessages.sort((a, b) => b.timestamp - a.timestamp);
            console.log(newMessages)
            return newMessages

            
        })


    },[messages])






    

    return (


        <>
    
            <div className="w-full h-screen" data-theme="dark">


                <div className="w-full  min-h-screen flex flex-row h-full">
                    {(activeContact === null) && (
                        <div className="w-full flex-col flex gap-2 bg-base-200 p-4 h-full lg:hidden">
                        <p className="font-2 text-2xl font-bold">Contacts</p>
                        {(contacts !== undefined) && (
                            contacts.map((contact,i) => (
                            <div key={i}>
                            {(contact.messages > 0) && (
                                <div className="p-4  border-2 border-base-100 flex flex-row items-center justify-items-center gap-4 rounded-lg cursor-pointer hover:bg-base-100 select-none" key={i} onClick={(e) => {
                                setActiveContact(i)
                            }}>
                                <div className="avatar placeholder">
                                    <div className="w-12 rounded-full bg-neutral ">
                                    <p className="text-2xl font-2">{contact["name"].substring(0,1)}</p>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-1 text-lg font-semibold ">{contact.name}</p>   
                                    {(contact.messages === 0) && (
                                        <p className="font-1 ">No messages</p>
                                    )}
                                    {((contact.messages > 0) && (contact.messages < 4)) && (
                                        <p className="font-1 font-bold">{contact.messages}+ messages</p>
                                    )}
                                    
                                </div>
                                
                                
                                
                            </div>

                            )}
                            {(contact.messages === 0) && (
                                <div className="p-4 bg-base-300 flex flex-row items-center justify-items-center gap-4 rounded-lg cursor-pointer hover:bg-base-100 select-none" key={i} onClick={(e) => {
                                setActiveContact(i)
                            }}>
                                <div className="avatar placeholder">
                                    <div className="w-12 rounded-full bg-neutral ">
                                    <p className="text-2xl font-2">{contact["name"].substring(0,1)}</p>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-1 text-lg font-semibold ">{contact.name}</p>   
                                    {(contact.messages === 0) && (
                                        <p className="font-1 ">No messages</p>
                                    )}
                                    {((contact.messages > 0) && (contact.messages < 4)) && (
                                        <p className="font-1 font-bold">{contact.messages}+ messages</p>
                                    )}
                                    
                                </div>
                                
                                
                                
                            </div>

                            )}




                            </div>
                            


                            

                        ))
                        )}
                        
                        <div>
                      

                        </div>
                        
                    </div>
                    )}
                    <div className="w-2/6 flex-col lg:flex hidden gap-2 bg-base-200 p-4 h-full">
                        <p className="font-2 text-2xl font-bold">Contacts</p>
                        {(contacts !== undefined) && (
                            contacts.map((contact,i) => (
                            <div key={i}>
                            {(contact.messages > 0) && (
                                <div className="p-4  border-2 border-base-100 flex flex-row items-center justify-items-center gap-4 rounded-lg cursor-pointer hover:bg-base-100 select-none" key={i} onClick={(e) => {
                                setActiveContact(i)
                            }}>
                                <div className="avatar placeholder">
                                    <div className="w-12 rounded-full bg-neutral ">
                                    <p className="text-2xl font-2">{contact["name"].substring(0,1)}</p>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-1 text-lg font-semibold ">{contact.name}</p>   
                                    {(contact.messages === 0) && (
                                        <p className="font-1 ">No messages</p>
                                    )}
                                    {((contact.messages > 0) && (contact.messages < 4)) && (
                                        <p className="font-1 font-bold">{contact.messages}+ messages</p>
                                    )}
                                    
                                </div>
                                
                                
                                
                            </div>

                            )}
                            {(contact.messages === 0) && (
                                <div className="p-4 bg-base-300 flex flex-row items-center justify-items-center gap-4 rounded-lg cursor-pointer hover:bg-base-100 select-none" key={i} onClick={(e) => {
                                setActiveContact(i)
                            }}>
                                <div className="avatar placeholder">
                                    <div className="w-12 rounded-full bg-neutral ">
                                    <p className="text-2xl font-2">{contact["name"].substring(0,1)}</p>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-1 text-lg font-semibold ">{contact.name}</p>   
                                    {(contact.messages === 0) && (
                                        <p className="font-1 ">No messages</p>
                                    )}
                                    {((contact.messages > 0) && (contact.messages < 4)) && (
                                        <p className="font-1 font-bold">{contact.messages}+ messages</p>
                                    )}
                                    
                                </div>
                                
                                
                                
                            </div>

                            )}




                            </div>
                            


                            

                        ))
                        )}
                        
                        <div>
                      

                        </div>
                        
                    </div>
                    

                    {(activeContact !== null) && (
                        <div className="relative w-full h-full lg:hidden block">
                        {(activeContact === null) && (
                            <div className=" w-4/6 p-5 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-24 mx-auto">
  <path d="m20.798 11.012-3.188 3.416L9.462 6.28l4.24-4.542a.75.75 0 0 1 1.272.71L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262ZM3.202 12.988 6.39 9.572l8.148 8.148-4.24 4.542a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262ZM3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18Z" />
</svg>

                                <p className="font-1 text-2xl font-bold">No Contact Selected</p>


                            </div>
                        )}
                        {(activeContact !== null) && (
                            <div className="">

                            
                            <div className="w-full h-full min-h-screen relative">
                                <div className="p-10 bg-base-300 relative">
                                <p className="font-2 font-bold text-2xl">{contacts[activeContact].name.split(" ")[0]}</p>
                                <div className="absolute top-[50%] translate-y-[-50%] right-4 bg-base-100 btn btn-circle" onClick={() => {
                                    setActiveContact(null)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>

                                </div>

                                </div>


                                <div className="pb-10 w-full ">
                                   
                                    <div className="w-full flex flex-col gap-4 py-10 px-4 chat max-h-[80vh] overflow-y-auto flex-col-reverse">
                                        {messages.map((message,i) => (
                                            <div key={i} className="w-full">
                                                {(message.sender !== "me") && (
                                                    <div className="chat chat-start">
                                                    <div className="chat-header">
                                                    <p className="font-1">{new Date(message.timestamp).toLocaleDateString("en-US")}</p>
                                                    </div>
                                                    <div className="chat-bubble chat-bubble-primary">
                                                        <p className="font-2 font-semibold">{message.message}</p>
                                                    </div>
                                                        
                                                    </div>
                                                    
                                        
                                                )}
                                                {(message.sender === "me") && (
                                                    <div className="chat chat-end">
                                                    <div className="chat-header">
                                                    <p className="font-1">{new Date(message.timestamp).toLocaleDateString("en-US")}</p>
                                                    </div>
                                                        <div className="chat-bubble chat-bubble-base-300">
                                                            <p className="font-2 font-semibold">{message.message}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            
                                                </div>

                                            ))}
                                        
                                    
                                    

                                
                                    
                                </div>
                                
                                
                                
                            </div>

                       
                                

                                <div className="w-full flex flex-row bg-base-300 p-5 gap-4 absolute bottom-0 left-0">
                                    <input type="text" className="input w-full font-2x" onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            sendMessage()
                                        }
                                    }} placeholder="Type your message here..." value={messageText} onChange={(e) => {setMessageText(e.target.value)}}></input>
                                    <button className="btn font-2 font-bold" onClick={sendMessage}>
                                        <p>Send Message</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" />
</svg>

                                    </button>

                                </div>
                                


                            
                                



                            </div>
                            
                            
                            
                            
                            
                            
                            
                            </div>
                            
                        )}
                        
                    
                        
                    </div>

                    )}
                    <div className="relative w-full h-full lg:block hidden">
                        {(activeContact === null) && (
                            <div className=" w-4/6 p-5 absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-24 mx-auto">
  <path d="m20.798 11.012-3.188 3.416L9.462 6.28l4.24-4.542a.75.75 0 0 1 1.272.71L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262ZM3.202 12.988 6.39 9.572l8.148 8.148-4.24 4.542a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262ZM3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18Z" />
</svg>

                                <p className="font-1 text-2xl font-bold">No Contact Selected</p>


                            </div>
                        )}
                        {(activeContact !== null) && (
                            <div className="">

                            
                            <div className="w-full h-full min-h-screen relative">
                                <div className="p-10 bg-base-300 relative">
                                <p className="font-2 font-bold text-2xl">{contacts[activeContact].name.split(" ")[0]}</p>
                                <div className="absolute top-[50%] translate-y-[-50%] right-4 bg-base-100 btn btn-circle" onClick={() => {
                                    setActiveContact(null)
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>

                                </div>

                                </div>


                                <div className="pb-10 w-full ">
                                   
                                    <div className="w-full flex flex-col gap-4 py-10 px-4 chat max-h-[80vh] overflow-y-auto flex-col-reverse">
                                        {messages.map((message,i) => (
                                            <div key={i} className="w-full">
                                                {(message.sender !== "me") && (
                                                    <div className="chat chat-start">
                                                    <div className="chat-header">
                                                    <p className="font-1">{new Date(message.timestamp).toLocaleDateString("en-US")}</p>
                                                    </div>
                                                    <div className="chat-bubble chat-bubble-primary">
                                                        <p className="font-2 font-semibold">{message.message}</p>
                                                    </div>
                                                        
                                                    </div>
                                                    
                                        
                                                )}
                                                {(message.sender === "me") && (
                                                    <div className="chat chat-end">
                                                    <div className="chat-header">
                                                    <p className="font-1">{new Date(message.timestamp).toLocaleDateString("en-US")}</p>
                                                    </div>
                                                        <div className="chat-bubble chat-bubble-base-300">
                                                            <p className="font-2 font-semibold">{message.message}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            
                                                </div>

                                            ))}
                                        
                                    
                                    

                                
                                    
                                </div>
                                
                                
                                
                            </div>

                       
                                

                                <div className="w-full flex flex-row bg-base-300 p-5 gap-4 absolute bottom-0 left-0">
                                    <input type="text" className="input w-full font-2x" placeholder="Type your message here..." value={messageText} onChange={(e) => {setMessageText(e.target.value)}}></input>
                                    <button className="btn font-2 font-bold" onClick={sendMessage}>
                                        <p>Send Message</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97-1.94.284-3.916.455-5.922.505a.39.39 0 0 0-.266.112L8.78 21.53A.75.75 0 0 1 7.5 21v-3.955a48.842 48.842 0 0 1-2.652-.316c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" />
</svg>

                                    </button>

                                </div>
                                


                            
                                



                            </div>
                            
                            
                            
                            
                            
                            
                            
                            </div>
                            
                        )}
                        
                    
                        
                    </div>


                    
                </div>


            </div>


        </>
    )
}