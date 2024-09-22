import React, {useState, useContext, useEffect} from "react";
import {UserContext, MenuContext} from "./Contexts";


const endpoint =  "http://localhost:5000"
export default function Dashboard(props) {

    const users = useContext(UserContext);
    const menu = useContext(MenuContext);



    const [students, setStudents] = useState([])


    const callGigs = () => {
        return new Promise(async(resolve) => {

            const headers = {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
            }


            const response = await fetch(endpoint + "/getGigs", headers)

            resolve(response.json())

        })

    }

    const callReject = (uuid) => {
        return new Promise(async(resolve) => {

            const headers = {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    person: uuid
                })
            }


            const response = await fetch(endpoint + "/reject", headers)

            resolve(response.json())

        })
    }

    const callMatch = (uuid) => {
        return new Promise(async(resolve) => {

            const headers = {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    receiver: uuid
                })
            }


            const response = await fetch(endpoint + "/match", headers)

            resolve(response.json())

        })
    }

    const processMatch = (uuid,i, name) => {
        removeCard(i)
        callMatch(uuid).then((res) => {
            if (res.code === "err") {
                // window.location.replace("/login")
            } else if (res.code === "ok") {


                props.setContacts((prevContacts) => {
                    return [...prevContacts, {
                        name: name,
                        uuid: uuid
                    }]

                })
                               






                
                // 
            } else {
                // window.location.replace("/login")
            }
        })
    }

    const processReject = (uuid,i) => {
        removeCard(i)
        callReject(uuid).then((res) => {
            if (res.code === "err") {
                window.location.replace("/login")
            } else if (res.code === "ok") {
                
                // setStudents(res.message)
            } else {
                window.location.replace("/login")
            }
        })
    }


    





    useEffect(() => {
        console.log("this was just being called type shit")
        callGigs().then((res) => {
            if (res.code === "err") {
                // window.location.replace("/login")
            } else if (res.code === "ok") {
                
                setStudents(res.message)
            } else {
                // window.location.replace("/login")
            }
        })
        
    },[])

    const removeCard = (index) => {
        setStudents((prevStudents) => {
            return prevStudents.filter((x,i) => i !== index)
        })

    }






    


    




    return (


        <>
          <div className="p-5 space-y-5 w-full h-full min-h-screen" data-theme="forest">
                    <h1 className="font-1 text-4xl font-bold lg:text-left text-center">Hello, {users.name}</h1>

                    <div className="bg-base-200 w-full p-6 rounded-lg flex flex-col space-y-5">
                        <div className="flex flex-row space-x-2 content-center items-center">
                            <p className="font-2 text-3xl font-semibold">Current students</p>
                            <div className="badge badge-primary font-1 font-bold">{students.length < 99 ? students.length : "99+"}</div>
                        </div>


                        {(students.length > 0) && (
                            <div className="lg:grid lg:grid-cols-3 flex flex-col gap-2 justify-between p-2">
                            {students.map((student, i) => (
                                <div className="card bg-base-100 shadow-xl" key={i}>
                                    <div className="card-body">
                                        <div className="avatar placeholder justify-center">
                                            <div className="bg-neutral text-neutral-content w-24 rounded-full">
                                                <span className="text-3xl font-bold">{student.name.substring(0,1)}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h2 className="font-bold text-xl font-1">{student.name}</h2>
                                           
                                                <div className="badge badge-outline badge-secondary p-3 rounded-full bg-base-300 w-fit">
                                                    <p className="font-2 font-semibold">{student.grade}</p>
                                                </div>  
                                        
                                             
                                        </div>                                     
                                        <div className="card-actions grid grid-cols-2 justify-stretch p-2 font-1">
                                            <button className="btn btn-accent gap-2" onClick={() => processMatch(student.uuid, i, student.name)}>Accept <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"> <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /> </svg> </button>
                                            <button className="btn btn-second btn-outline" onClick={() => processReject(student.uuid, i)} >Decline</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        )}
                        {(students.length === 0) && (
                            <div className="p-10 bg-base-300 rounded-lg ">
                                <p className="text-center font-1 text-lg font-semibold">No Requests found</p>
                            </div>
                        )}

                        
                    </div>
                </div>
            




        </>
    )
}