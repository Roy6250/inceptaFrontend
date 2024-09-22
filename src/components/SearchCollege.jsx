import React, {useState, useEffect} from "react"

import Loading from "./Loading"





const endpoint =  "http://localhost:5000"
export default function SearchCollege(props) {
    const [searchBar, setSearchBar] = useState("")
    const [errorMessage, setErrorMessage] = useState("No mentors found")


    const [loading,setLoading] = useState(false)
    const [colleges, setColleges] = useState([])

    const processSearch = () => {
        return new Promise(async(resolve) => {
            const response = await fetch(endpoint + "/search", {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: searchBar
                })
            })

            resolve(response.json())
        })
    }


    useEffect(() => {

        if (searchBar !== "") {
            processSearch().then((res) => {
                if (res.code === "err") {
                    setErrorMessage("You aren't logged in.\n\nPlease log in")
                    console.log("something went wrong :(")
                } else if (res.code === "ok") {
                    setColleges(res.message)
                } else {
                    console.log(res)
                }
            })
        }




    }, [searchBar])

    





    






    return (


        <>


        <div className="min-h-[40vh] bg-base-100" data-theme="forest">

            <div className="">
                <div className="w-full text-center lg:p-10 p-2 rounded-lg bg-base-300">
                <div className="bg-base-100 w-fit mx-auto p-2 lg:p-10 rounded-lg">

                    <p className="p-2 font-2 text-2xl font-bold">See if your dreams are in our catalog</p>
                    <div className=" mx-auto w-fit">
                        <div className="lg:join">
                            <input value={searchBar} onChange={(e) => setSearchBar(e.target.value)} className="input lg:join-item input-primary font-1 font-semibold input-lg" placeholder="Search for schools here..." />
                        </div> 
                
                    </div>


                    {(colleges.length > 0) && (
                        <div className="flex flex-row gap-4 flex-wrap rounded-lg items-center lg:w-3/6 mx-auto mt-4 bg-base-100 lg:p-8">
                        {colleges.map((college,i) => (
                            <div key={i} className="lg:px-10 px-3 rounded-lg  gap-8 font-1 py-5 cursor-pointer flex flex-row items-center justify-items-center select-none hover:bg-primary hover:text-white transition-all bg-base-300">
                                <p className="text-xl font-semibold">{college.school}</p>
                                <div className="">
                                    <p className="font-1">Students:</p>
                                    <p className="px-3 border-primary border-2 rounded-full bg-base-100 text-white">{college.mentors}+</p>


                                </div>
                            

                            
                            </div>
                        ))}
                    </div>
                    )}
                    {(colleges.length === 0) && (
                        <div className="mt-4 p-5 rounded-lg bg-base-300">
                            <p className="font-1">{errorMessage}</p>
                        </div>
                    )}
                    



                </div>
                
                </div>
            </div>
        </div>


        </>
    )
}