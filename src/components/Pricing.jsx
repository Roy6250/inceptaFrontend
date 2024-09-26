// import React from "react"
// import { FaPeopleCarry } from "react-icons/fa";
// import {loadStripe} from "@stripe/stripe-js"
// import SearchCollege from "./SearchCollege"
// const endpoint =  "http://localhost:5000"

// const stripe = await loadStripe("pk_live_51PfrGXB0G0gRD2WAbGSwORPy5hO4OQLJ608Jtz0xrCugbvOn1RBV9hVGYMJ75fjJ62SZZeWgt3mSRk2Ej7wnXeti00eYLYVuOD")
// export default function Pricing(props) {

//     // accepts prop.signup

//     // true = redirects to /signup
//     // false = goes to stripe
//     const callPayment = (item) => {
//         return new Promise(async(resolve) => {
//             const body = {
//                 product: item
//             }
//             const response = await fetch(endpoint + '/create-checkout-session', {
//                 method: "POST",
//                 mode: "cors",
//                 credentials: "include",
//                 headers: {
//                   "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(body)
//             })
//             resolve(response.json())

//         })
//     }


//     const makePayment = async (item) => {
//         console.log("heres the thing right")
//         callPayment(item).then((res) => {
//             console.log("response res", res)
//             if (res.id.length>0) {
//                 console.log("heres the response that happened here", res)
//                 const result = stripe.redirectToCheckout({sessionId: res.id})
//                 console.log("heres the thing "+result)
//                 if (result.error) {
//                     console.log(result.error)
//                 }    
//             } else {
//                 // window.location.replace("/login")

//             }
            
//         })
        
//     }

//     return (
//         <>

       


//     <div className="lg:p-3 rounded-lg mx-auto w-full h-full my-24 space-y-8" data-theme="light">
//             <p className="text-left font-1 lg:text-6xl text-4xl font-bold">Pricing:</p>

//             <div className="p-10 bg-base-300 rounded-lg flex flex-col">
//                 <div className="grid grid-cols-2 items-center justify-center  gap-y-12 font-1 font-semibold text-lg ">
//                     <div className="">
//                         <p className="text-3xl">Price</p>
//                     </div>
//                     <div className="">
//                         <p className="text-3xl">Credits</p>
//                     </div>
                    
//                     <div>
//                         <p className="font-2 font-semibold text-2xl">$8.99</p>
//                     </div>

//                     <div>
//                         <div className="btn w-fit btn-lg btn-neutral btn-outline" onClick={() => {
//                             makePayment({
//                                     name: "100 Tokens",
//                                     price: 8.99,

//                             })
//                         }}>
//                             <p className="font-1 font-semibold text-lg">100 Credits</p>
//                         </div>
//                     </div>


//                     <div>
//                         <p className="font-2 font-semibold text-2xl">$24.99</p>
//                     </div>
                     
//                     <div>
//                         <div className="btn w-fit btn-lg btn-outline btn-base-300" onClick={() => {
//                             makePayment({
//                                     name: "300 Tokens",
//                                     price: 24.99,
                                    
//                                 }) 
//                         }}>
//                             <p className="font-1 font-semibold text-lg">300 Credits</p>
//                         </div>
//                     </div>
//                     <div>
//                         <p className="font-2 font-bold text-2xl">$29.99</p>
//                     </div>
                     
//                     <div>
//                         <div className="btn w-fit btn-lg btn-outline btn-base-300 relative" onClick={() => {
//                             makePayment({
//                                     name: "350 Tokens",
//                                     price: 29.99,
//                                 }) 
//                         }}>
//                             <div className="absolute top-[-13px] z-20 right-[-10px] badge badge-neutral font-1 font-bold ">
//                                 Worth one call
//                             </div>
//                             <p className="font-1 font-semibold text-lg">350 Credits</p>
//                         </div>
//                     </div>


//                     <div>
//                         <p className="font-2 font-bold text-2xl">$44.99</p>
//                     </div>
//                     <div className="cursor-pointer select-none">
                        
//                         <div className="w-fit relative">
//                         <div className="absolute top-[-13px] z-20 right-[-10px] badge badge-neutral font-1 font-bold ">
//                             20% more
//                         </div>
//                         <div className="btn w-fit btn-lg btn-neutral btn-outline" onClick={() => {

//                                 makePayment({
//                                     name: "600 Tokens",
//                                     price: 44.99,
                                    
//                                 })


//                         }}>
//                             <p className="font-1 font-semibold text-lg">600 Credits</p>
//                         </div>
//                         </div>
                        
//                     </div>


                    
                

//                 </div>

                

//             </div>
//             <div className="p-10 bg-base-300 rounded-lg mt-2 flex flex-col gap-3">
//                 <div className="collapse collapse-arrow">

//                 <input type="radio" name="typeShit"  />
//                 <p className="font-1 text-2xl collapse-title">What are credits used for?</p>
//                 <div className="collapse-content">
//                     <p className="font-2 font-semibold text-lg">Credits are used to purchase either message-based conversations or video calls with college students.</p>

//                 </div>

//                 </div>
//                 <div className="collapse collapse-arrow ">

//                 <input type="radio" name="typeShit"  />
//                 <p className="font-1 text-2xl collapse-title">Why do I need credits?</p>
//                 <div className="collapse-content">
//                     <p className="font-2 font-semibold text-lg">Credits allow incepta to ensure high quality conversations college and high school students.</p>

//                 </div>

//                 </div>
//                 <div className="collapse collapse-arrow ">

//                 <input type="radio" name="typeShit"  />
//                 <p className="font-1 text-2xl collapse-title">How long are the conversations?</p>
//                 <div className="collapse-content">
//                     <p className="font-2 font-semibold text-lg">Message-based conversations last 72 hours and video calls last 30 minutes per session. You can use more credits to continue your conversations.</p>

//                 </div>

//                 </div>



                

//             </div>

//             {/* <div className="p-10 grid grid-cols-3 justify-between items-center gap-y-6 bg-black rounded-lg w-full">
//                 <div className="col-span-2 w-full">
//                     <p className="font-1 font-bold text-2xl">Pricing</p>

//                 </div>

//                 <div>
//                     <p className="font-1 font-semibold text-2xl">Tokens</p>
                

//                 </div>
//                 <hr className="col-span-3 border-b-2 border-white rounded-full"></hr>

//                 <div className="col-span-2">
//                     <p className="font-2 font-bold text-xl">$8.99</p>
//                 </div>

//                 <div className="btn w-fit">
//                     <p className="font-2 font-semibold text-lg">100 Tokens</p>
//                 </div>

//                 <hr className="col-span-3 border-b-2 border-white rounded-full"></hr>




//             </div> */}
            






//             {/* <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-4 justify-evenly p-10">
//                 <div className="outline lg:block hidden outline-green-500 outline-offset-1 outline-4 rounded-lg w-full mx-auto bg-base-300">
//                     <div className="w-full h-full p-2 lg:mb-20">
//                         <div className="lg:p-2 bg-base-300 rounded-lg w-full mx-auto">
//                             <div >
//                                 <div className="lg:w-11/12 mx-auto p-2 pb-0 rounded-lg space-y-5">
//                                     <div className="flex flex-row justify-center content-center items-center gap-2">
//                                         <p className="text-center font-1 font-bold text-3xl lg:text-4xl my-2">Credit Prices</p>
//                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 lg:block hidden">
//                                             <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                                         </svg>
//                                     </div>
//                                     <div>
//                                         <ul className="font-2 lg:text-4xl text-lg justify-center text-center space-y-12">
//                                             <li>Use <span className="font-bold underline">credits</span> to pay for <span className="font-bold underline">conversations</span></li>
//                                             <li>Each conversation lasts for <span className="font-bold underline">72 hours</span></li>
//                                             <li>Each Conversation costs around <span className="font-bold underline">85</span> credits</li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>                        
//                         </div>
//                     </div>
//                 </div>
//                 <div className="flex flex-col outline outline-green-500 outline-offset-1 outline-4 rounded-lg w-full p-4 pb-10 gap-4 mx-auto bg-base-300 justify-evenly">
//                         <div className="flex flex-row justify-center items-center content-center">
//                             <p className="font-1 text-4xl p-3 font-bold underline text-center">
//                                 Credit Bundles
//                             </p>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
//                                 <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
//                             </svg>
//                         </div>
//                         <div className="grid grid-cols-2 w-full items-center justify-stretch gap-7">
//                             <div className="outline-gray-500 font-1 rounded-lg font-semibold text-4xl text-white text-center">$8.99</div>
//                             <button className="btn btn-primary rounded-lg w-5/6" onClick={() => {
//                                 makePayment({
//                                     name: "100 Tokens",
//                                     price: 8.99,

//                                 })
//                             }}>
//                                 <p className="text-2xl font-1 font-bold">100</p>
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-2 w-full items-center justify-stretch gap-7">
//                             <div className="outline-gray-500 rounded-lg text-4xl text-white text-center font-1 font-semibold">
//                                 $24.99
//                             </div>
//                             <button className="btn btn-primary rounded-lg w-5/6 items-center relative" onClick={() => {
//                                 makePayment({
//                                     name: "300 Tokens",
//                                     price: 24.99,
                                    
//                                 })
//                             }}>
//                                 <p  className="text-2xl font-1 font-bold">300</p>
//                                 <div className="badge badge-error text-sm absolute top-[-10px] right-[-20px] font-1">8% MORE</div>
//                             </button>
//                         </div>
//                         <div className="grid grid-cols-2 w-full items-center justify-stretch gap-7">
//                             <div className="outline-gray-500 rounded-lg text-4xl text-white text-center font-1 font-semibold">$44.99</div>
//                             <button className="btn btn-primary outline outline-yellow-500 outline-offset-4 outline-4 rounded-lg w-5/6 relative" onClick={() => {
//                                 makePayment({
//                                     name: "600 Tokens",
//                                     price: 44.99,
                                    
//                                 })
//                             }}>
//                                 <p className="text-2xl font-1 font-bold">600</p>
//                                 <div className="badge badge-error text-sm absolute top-[-10px] right-[-20px] font-1">20% MORE</div>
//                             </button>
                            
//                             {/* <p className="text-yellow-500 col-span-2 font-2 font-bold text-2xl text-start">✨ BEST DEAL</p> */}
//                         </div>
//                         {/* <div className="w-fit ml-auto mr-8">
//                             <div className="">
//                                 <p className="text-yellow-500 font-2 font-bold text-2xl text-start">✨ BEST DEAL</p>
//                             </div>
//                         </div> */}
//                 {/* </div> */}
//             {/* </div> */}
//         {/* </div> */}
//         {/* <SearchCollege /> */}

//         </>
        
//     )
// }