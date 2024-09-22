import React, {useState, useEffect} from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import FormError from "./FormError"
import Loading from "./Loading"

import { FaChild, FaGraduationCap} from "react-icons/fa";

const formQuantity = 5

const endpoint = process.env.REACT_APP_SERVER_URL

export default function Signup(props) {
    const [code, setCode] = useState("")
    const [bio, setBio] = useState("")
    const [grade, setGrade] = useState(9)
    const [password, setPassword] = useState("")
    const [currentInterest, setCurrentInterest] = useState("")
    const [interests, setInterests] = useState([])
    const [email, setEmail] = useState("")
    const [img, setImg] = useState("")
    const [userType, setUserType] = useState("")
    const [name, setName] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [bioLength, setBioLength] = useState(0)
    const nextSlide = () => {
        setCurrentSlide(prevSlide => prevSlide+1)
    }


    useEffect(() => {
        if ((currentInterest !== "") && (!interests.includes(currentInterest)) && (interests.length < 6)) {

            setInterests((prevInterests) => { 
                    return [...prevInterests, currentInterest]
                })
            setCurrentInterest("")
                
            
            
        }

    },[currentInterest])


    const processForm = () => {
        let student;
        if (userType === "student") {
            student = false
        } else {
            student = true
        }

        return new Promise(async(resolve) => {
            const headers = {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    student: student,
                    name: name,
                    interests: interests,
                    password: password,
                    grade: grade,
                    bio: bio,
                    email: email,
                    img: img
                })
              }

              try{
            const response = await fetch(endpoint + "/signup", headers)

            resolve(response.json())
              }catch(e)
              {
                console.log(e)
              }
            
        })
    }
    
    const processVerify = () => {
        return new Promise(async(resolve) => {

            const headers = {
                method: "POST",
                mode: "cors",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: code
                })
              }

            const response = await fetch(endpoint + "/verify", headers)
            resolve(response.json())
        })
        


          
    }



    const submitVerify = () => {
        setLoading(true)
        processVerify().then((res) => {
            if (res.code === "err") {
                setErrorMessage("Invalid Code" + "|" + Math.floor(Math.random()*100))
                console.log("Something went wrong")
                setLoading(false)



            } else if (res.code === "ok") {
                window.location.replace("/main")
                setLoading(false)

            } else {
                setErrorMessage("Something went wrong" + "|" + Math.floor(Math.random()*100)) 
                setLoading(false)
            }
        })

    }


    const submitForm = () => {

        // Form validation frontend
        let passedValidation = true
        
        if (name.length < 2) {
            setErrorMessage("Enter your name" + "|" + Math.floor(Math.random()*100))
            passedValidation = false
        } else if (email.split("@").length !== 2) {
            setErrorMessage("Enter a valid email" + "|" + Math.floor(Math.random()*100))
            passedValidation = false
        } else if (interests.length < 1) {
            setErrorMessage("Enter an interest" + "|" + Math.floor(Math.random()*100))
            passedValidation = false
        } else if (password.length < 8) {
            setErrorMessage("Password must be at least 8-19 characters" + "|" + Math.floor(Math.random()*100))
            passedValidation = false
        } 

        if (userType === "college") {
            if (bio.length < 20) {
                setErrorMessage("Bio must be at least 20 characters" + "|" + Math.floor(Math.random()*100))
                passedValidation = false
            } else if (bio.length > 600) {
                setErrorMessage("Bio cannot be more than 600 characters" + "|" + Math.floor(Math.random()*100))
                passedValidation = false
            } else if (img === "") {
                setErrorMessage("Add an image" + "|" + Math.floor(Math.random()*100))
                passedValidation = false    
            } else if (email.substring(email.length-4) !== ".edu") {
                setErrorMessage("Use your college email (.edu)" + "|" + Math.floor(Math.random()*100))
                passedValidation = false
            }
        }





        if (passedValidation) {
            setLoading(true)
            processForm().then((res) => {
                console.log("res im using", res)
                if (res.message === "already exists") {
                    setLoading(false)
                    setErrorMessage("Already exists")
                    window.location.replace("/login")
                } else if (res.message === "invalid email") {
                    setErrorMessage("Please use your .edu account" + "|" + Math.floor(Math.random()*100))
                    setLoading(false)
                } else if (res.code === "err") {
                    setErrorMessage(res.message + "|" + Math.floor(Math.random()*100))
                    setLoading(false)
                    console.log("invalid request")
                } else if (res.code === 'ok') {
                    setLoading(false)
                    console.log("all went well")
                    nextSlide()
                } else {
                    setLoading(false)
                    setErrorMessage(res.message + "|" + Math.floor(Math.random()*100))
                    console.log("something went wrong")
                }
            })


        }
        

    }




    return (


        <section data-theme="forest">
        {(loading) && (
            <Loading />
        )}

        
        <Navbar />
        <div className="lg:my-24 mb-40 lg:w-4/6 rounded-lg min-h-[40vh] bg-base-300 mx-auto lg:p-10 text-center relative">
            <FormError error={errorMessage} />



            
            


        
        {(currentSlide ===0) && (
            <div className="grid lg:grid-cols-2 items-center justify-items-center lg:p-4 select-none gap-4">
                <div className="w-full h-full bg-base-200 p-10 hover:bg-base-100 transition-all rounded-lg cursor-pointer" onClick={(e) => {
                    setUserType("student")
                    nextSlide()
                    
                }}>
                    <div className="w-fit mx-auto p-4 bg-neutral rounded-full">
                        <FaChild className="size-24" />
                        
                    </div>
                    <p className="   font-1 text-lg font-semibold mt-4">I am a High School student</p>


                </div>
                <div className="w-full h-full bg-base-200 p-10 hover:bg-base-100 transition-all rounded-lg cursor-pointer" onClick={(e) => {
                    setUserType("college")
                    nextSlide()
                }}>
                    <div className="w-fit mx-auto p-4 bg-neutral rounded-full">
                        <FaGraduationCap className="size-24" />
                        
                    </div>
                    <p className="font-1 text-lg font-semibold mt-4">I am a College Student</p>


                </div>
            </div>

        )}
        {(currentSlide === 1) && (
            <div className="text-left lg:p-5 p-2">
                <p className="font-2 text-2xl font-bold">Basic Information:</p>
                <p className="font-1 text-lg font-semibold">{userType==="student" ? "Student signup" : "College signup"}</p>
                
                <div className="lg:p-4 p-2 rounded-lg bg-base-100 grid grid-cols-1 lg:grid-cols-2  gap-4">

                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-neutral">
                        <div className="grid grid-col-2 items-center">
                            <div>
                                <p className="font-2 font-semibold">Name:</p>
                            </div>
                            <div>
                                <input type="text" className="input input-accent font-1 font-semibold max-w-full" value={name} placeholder="John Doe" onChange={(e) => {
                                    setName(e.target.value)
                                }} />
                            </div>

                            
                            
                        </div>
                        <div className="grid grid-col-2 items-center">
                            <div>
                                <p className="font-2 font-semibold">{userType==="student"? "Personal": "College"} Email: </p>
                            </div>
                            <div>
                                <input type="email" className="input input-accent font-1 font-semibold max-w-full" placeholder={userType==="student"?"example@gmail.com":"example@harvard.edu"} value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>

                            
                            
                        </div>
                        
                            <div className="grid grid-col-2  items-center">
                            <div>
                            {(userType === "student") && (
                                <p className="font-2 font-semibold">Interests:</p>
                            )}
                            {(userType === "college") && (
                                <p className="font-2 font-semibold">Major(s):</p>
                            )}
                                
                            </div>
                            <div className="lg:join">
                                <select className="select select-accent font-1 font-semibold join-item lg:w-full w-40 max-w-full" value={currentInterest} onChange={(e) => {
                                    setCurrentInterest(e.target.value)
                                    // if ((currentInterest !== "") && (!interests.includes(currentInterest)) && (interests.length < 6)) {
                                    //     setInterests((prevInterests) => {
                                    //         return [...prevInterests, currentInterest]
                                    //     })
                                    // }

                                    
                                    
                                    
                                    
                                }}>
                                    
                                    <option value="">Add Major</option>

                                    <option value="business">Business</option>
                                    <option value="theatre">Theatre</option>
                                    <option value="music">Music</option>
                                    <option value="musical theatre">Musical Theatre</option>
                                    <option value="nursing">Nursing</option>
                                    <option value="psychology">Psychology</option>
                                    <option value="biology">Biology</option>
                                    <option value="education">Education</option>
                                    <option value="engineering">Engineering</option>
                                    <option value="comp sci">Computer Science</option>
                                    <option value="communications">Communications</option>
                                    <option value="criminal">Criminal Justice</option>
                                    <option value="political">Political Science</option>
                                    <option value="economics">Economics</option>
                                    <option value="english">English</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="environmental">Environmental Science</option>
                                    <option value="history">History</option>
                                    <option value="social">Social Work</option>
                                    <option value="math">Mathematics</option>
                                    <option value="data science">Data Science</option>
                                    <option value="journalism">Journalism</option>
                                    <option value="Premed">Premed</option>
                                

                                
                                </select>
                                <div id="addThing" className="join-item btn btn-accent lg:inline-flex hidden" onClick={(e) => {
                                    if ((currentInterest !== "") && (!interests.includes(currentInterest)) && (interests.length < 6)) {
                                        setInterests((prevInterests) => {
                                            return [...prevInterests, currentInterest]
                                        })
                                        setCurrentInterest("")
                                    }
                                    
                                }}>
                                    <p className="font-1 font-semibold">Add {userType==="student"? "Interest": "Major"}</p>
                                </div>
                                {/* <input type="text" className="input input-accent font-1 font-semibold" placeholder="" /> */}
                            </div>
                            <p className="font-1 text-sm">Up to 6 Add {userType==="student"? "Interests": "Majors"}</p>
                            
                            <div className="flex flex-wrap flex-row gap-2 p-5">
                                {interests.map((interest, i) => (
                                    <div key={i} className="p-4 rounded-lg bg-base-200 relative">
                                        <div onClick={() => {
                                            setInterests((prevTags) => prevTags.filter((_, index) => index !== i))
                                        }} className="absolute cursor-pointer hover:bg-base-100 top-[-10px] select-none font-1 text-center right-0 rounded-full bg-error text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
</svg>
                                        </div>
                                        <p className="font-1 font-semibold">{interest}</p>

                                    </div>
                                ))}
                            </div>
                            <div className="">
                                <p className=""></p>
                            </div>
                           
                            
                            
                            
                        </div>
                     
                        
                        

                    </div>



                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-neutral">
                        <div className="grid grid-col-2 items-center">
                            <div>
                                <p className="font-2 font-semibold">Password:</p>
                            </div>
                            <div>
                                <input type="password" maxLength="19" className="input input-accent font-1 font-semibold max-w-full" placeholder="**********" value={password} onChange={(e) => {
                                    setPassword(e.target.value.trim())
                                }} />
                            </div>

                            
                            
                        </div>
                        <div className="grid grid-col-2 items-center">
                            <div>
                                <p className="font-2 font-semibold">Grade:</p>
                            </div>
                            <div>
                                <select className="select select-primary font-1 font-semibold  max-w-full" value={grade} onChange={(e) => {
                                    setGrade(e.target.value)
                                }}>
                                    <option value="9">Freshman</option>
                                    <option value="10">Sophomore</option>
                                    <option value="11">Junior</option>
                                    <option value="12">Senior</option>
                               </select>
                                {/* <input type="email" className="input input-accent font-1 font-semibold" placeholder="example@gmail.com" /> */}
                            </div>

                            
                            
                        </div>
                        {(userType === "college") && (
                            <>
                            <div className="relative">
                                <div className="absolute bottom-[-10px] right-0 p-2 rounded-full bg-base-300 font-1 font-semibold select-none">
                                    <p>{bioLength}/600</p>
                                </div>
                                
                                <textarea maxLength="600" onChange={(e) => {
                                    setBio(e.target.value)
                                    setBioLength(e.target.value.length)
                                }} className="textarea textarea-primary font-1 w-full textarea-lg" placeholder="Write your bio here (hobbies, about yourself)" />


                        </div>

                        <div className="">
                            <p className="font-2 font-semibold ">Upload Profile Picture:</p>
                            <input type="file" className="file-input file-input-primary font-1 lg:w-fit w-32" accept="image/*" onChange={(e) => {
                                const file = e.target.files[0]


                                if (file) {
                                    const reader = new FileReader()
                                    reader.onload = () => {
                                        console.log(reader)
                                        setImg(reader.result)
                                    }
                                    reader.readAsDataURL(file)
                                }
                            }} />
                        </div>
                            </>
                            
                        )}
          
                        <div className="grid grid-col-2 items-center">
                            <div className="btn btn-accent btn-wide" onClick={() => {
                                submitForm()
                        
                            }}>
                                <p className="font-1 font-semibold">Submit</p>

                            </div>

                            
                            
                        </div>


                    </div>



                    

                </div>



            </div>
        )}

        {(currentSlide === 2) && (
            <div className="p-2 rounded-lg bg-base-200 w-fit mx-auto">


                <div className="p-10 pb-8 bg-base-100 w-fit mx-auto">
                    <p className="text-center font-1 text-2xl font-bold">Verify your email</p>
                    <p className="font-2 font-semibold">A verification code was sent to <i>{email}</i><br/>Check your spam if not found</p>
                </div>
                <div className="p-2 rounded-b-lg bg-base-300 flex flex-col items-center gap-2">
                    <input value={code} onChange={(e) => {setCode(e.target.value)}} className="input input-primary text-center font-2" placeholder="*******" />
                    <button onClick={() => submitVerify()} className="btn btn-accent font-1 font-bold">
                        <p>Verify Code</p>
                    </button>
                </div>
                
            </div>
            
        )}
        
        </div>
        <Footer />

        

        





        </section>
    )
}