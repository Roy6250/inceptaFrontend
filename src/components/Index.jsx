import React, {useState, useEffect} from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Pricing from "./Pricing"
let carouselElement

let interval;
let currentScroll = 0;

export default function Index(props) {
    
    return (


        <>

        <Navbar />

        <div className="hero w-full min-h-[60vh] bg-base-200"  data-theme="forest">
            <div className="hero-content">
                <div className="sm:grid sm:grid-cols-2 items-center justify-items-center gap-10 space-x-10">
                    <div className=" flex flex-col gap-5 p-3">
                        <div className="flex flex-col gap-6">
                            <p className="font-1 font-bold sm:text-6xl text-5xl leading-10">Connect with Students in Your Dream College</p>
                        </div>
                        <div className="mt-6">
                            <p className="text-2xl font-2 font-semibold leading-10">Message with students to learn about campus life, build connections, and discover your perfect college match.</p>
                        </div>
                        <a href="/signup" className="btn btn-accent p-30 rounded-lg w-5/6 h-20 mt-3">
                            <p className="font-1 font-bold text-2xl">Connect Now</p>
                        </a>
                    </div>
                    <div className="w-[550px] h-[500px] lg:block hidden">
                        <img className="w-full h-full object-cover rounded-2xl outline outline-4 outline-offset-4 outline-accent" src="https://inceptaimg.s3.amazonaws.com/leangap4.png" />
                    </div>
                </div>
            </div>
        </div>

        <div className="relative">
            <div class="custom-shape-divider-top-1721341747">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
            </div>
        </div>

        <div className="mb-20 mt-40" data-theme='dark'>
            <p className="font-1 font-bold text-6xl text-center my-10">Why Choose Incepta?</p>

            <div className="grid lg:grid-cols-3 grid-cols-1 justify-stretch lg:w-5/6 w-full bg-base-300 rounded-lg mx-auto my-10 p-7 gap-8">
                <div className="flex flex-col p-10 content-center items-center gap-5 bg-base-100 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-48">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                    </svg>
                    <p className="font-2 text-4xl text-center font-bold">Connect Fast</p>
                    <p className="font-2 text-3xl text-center">Match with a college student, get accepted, and start chatting! <span className="font-bold">Just two clicks.</span></p>
                </div>
                <div className="flex flex-col p-10 content-center items-center gap-5 bg-base-100 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-48">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                    </svg>
                    <p className="font-2 text-4xl text-center font-bold">Variety of Universities</p>
                    <p className="font-2 text-3xl text-center">Select from a wide range of universities and colleges. <span className="font-bold">Pick what's best for you.</span></p>
                </div>
                <div className="flex flex-col p-10 content-center items-center gap-5 bg-base-100 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-48">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                    </svg>
                    <p className="font-2 text-4xl text-center font-bold">Ease of Use</p>
                    <p className="font-2 text-3xl text-center">Communicate with an easy-to-use message interface, <span className="font-bold">built for your convenience.</span></p>
                </div>
            </div>
        </div>

        <div className="bg-base-300 w-full p-10">
            <h1 className="font-1 text-center text-6xl font-bold">Meet some of our college students</h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 items-center justify-items-center lg:p-10 lg:w-fit w-full mt-10 lg:bg-base-100 mx-auto rounded-lg gap-5">
                <div className="rounded-lg p-3 bg-base-200 w-fit h-fit flex lg:flex-row flex-col gap-2">
                    <div className="avatar mx-auto">
                        <div className="mask mask-squircle w-48">
                            <img alt="collegeStudentPhoto" src="https://inceptaimg.s3.us-east-1.amazonaws.com/16246a3a4f2b009320cd879dc15423bce92fa864d5625779cfb9e32bddd0170973066a150722924af4cccf6cc427a5212c64e7ad5fdee05fb8ca8bc0beedc24c.png" />

                        </div>
                    </div>
                    <div className="p-9 bg-base-100 rounded-lg w-full">
                    <div className="border-[1px] border-primary bg-base-100 font-1 font-semibold p-2 rounded-full w-fit px-4 text-xl">
                    <p className="text-center">Columbia University</p>
                    </div>
                        <div className="mb-2">
                        <p className="font-2 font-bold text-3xl mt-3">Krithvi</p>
                        <p className="font-1 ">Premed</p>
                        </div>
                        
                        <a href="/signup" className="btn btn-accent btn-outline font-1">
                            <p>Connect now</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
</svg>


                        </a>
                        

                    </div>
                    

                </div>


                <div className="rounded-lg p-3 bg-base-200 w-fit h-fit flex lg:flex-row flex-col gap-2">
                    <div className="avatar mx-auto">
                        <div className="mask mask-squircle w-48">
                            <img alt="collegeStudentPhoto" src="https://inceptaimg.s3.us-east-1.amazonaws.com/de08070ac6b6923f20e2e38f37d3fe85b4cfb653d733d137bbbe9f43c438f493ff9b9c162828f62090ae8619be7273660a3e86fe4c8f01cfd888ecc5b2ec38a8.png" />

                        </div>
                    </div>
                    <div className="p-9 bg-base-100 rounded-lg w-full">
                    <div className="border-[1px] border-primary bg-base-100 font-1 font-semibold p-2 rounded-full w-fit px-4 text-xl">
                    <p className="text-center">Brown University</p>
                    </div>
                        <div className="mb-2">
                        <p className="font-2 font-bold text-3xl mt-3">Nainika</p>
                        <p className="font-1 ">Computer Science and Math</p>
                        </div>
                        
                        <a href="/signup" className="btn btn-accent btn-outline font-1">
                            <p>Connect now</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
</svg>


                        </a>
                        

                    </div>
                    

                </div>
                <div className="lg:col-span-2">

                <div className="rounded-lg p-3 bg-base-200 w-fit h-fit flex lg:flex-row flex-col gap-2">
                    <div className="avatar mx-auto">
                        <div className="mask mask-squircle w-48">
                            <img alt="collegeStudentPhoto" src="https://inceptaimg.s3.us-east-1.amazonaws.com/b58078fea7ca1dbe5fe2506e1adccd425fecaa64867b94a6773a98e6e639652d4be82251dc7cf4e58d3ac32ac67495709f4067e02a6d7a4aa938c94b92bac14e.png" />

                        </div>
                    </div>
                    <div className="p-9 bg-base-100 rounded-lg w-full">
                    <div className="border-[1px] border-primary bg-base-100 font-1 font-semibold p-2 rounded-full w-fit px-4 text-xl">
                    <p className="text-center">Duke University</p>
                    </div>
                        <div className="mb-2">
                        <p className="font-2 font-bold text-3xl mt-3">M</p>
                        <p className="font-1 ">Computer Science</p>
                        </div>
                        
                        <a href="/signup" className="btn btn-accent btn-outline font-1">
                            <p>Connect now</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
</svg>


                        </a>
                        

                    </div>
                    

                </div>




                </div>
                





            </div>
        </div>



        <div className="bg-base-100 min-h-[60vh] justify-stretch content-center">
            <p className="text-5xl font-1 font-bold text-center mt-20">Testimonials:</p>

            <div className="grid lg:grid-cols-3 grid-cols-1 items-center justify-stretch p-7 mb-20 font-2">
                <div className="card bg-base-200 rounded-xl lg:p-10 m-4 outline outline-4 outline-accent">
                    <div className="avatar justify-start lg:mr-5 p-5">
                        <div className="lg:w-64 w-32 rounded-full outline outline-offset-2 outline-gray-300 outline-4">
                            <img src="https://inceptaimg.s3.amazonaws.com/leangap1.jpg" />
                        </div>
                    </div>
                    <div className="card-body flex flex-col gap-5">
                        <div>
                            <h2 className="card-title text-4xl">Owen</h2>
                            <div className="badge badge-primary font-1 badge-lg badge-outline">12th Grade</div>
                        </div>
                        
                        <p className="text-start text-2xl">"Incepta made my college decision easier. Chatting with current students helped me see beyond the brochures and understand what life is really like on campus."</p>
                    </div>
                </div>
                <div className="card bg-base-200 rounded-xl lg:p-10 m-4 outline outline-4 outline-accent">
                    <div className="avatar justify-start lg:mr-5 p-5">
                        <div className="lg:w-64 w-32 rounded-full outline outline-offset-2 outline-gray-300 outline-4">
                            <img src="https://inceptaimg.s3.amazonaws.com/leangap2.jpg" />
                        </div>
                    </div>
                    <div className="card-body flex flex-col gap-5">
                        <div>
                            <h2 className="card-title text-4xl">Sayan</h2>
                            <div className="badge badge-accent font-1 badge-lg badge-outline">11th Grade</div>
                        </div>
                        
                        <p className="text-start text-2xl">"Using Incepta was a breeze! I quickly connected with a friendly college mentor who gave me personalized advice on navigating campus life. I feel much more prepared now."</p>
                    </div>
                </div>
                <div className="card bg-base-200 rounded-xl lg:p-10 m-4 outline outline-4 outline-accent">
                    <div className="avatar justify-start lg:mr-5 p-5">
                        <div className="lg:w-64 w-32 rounded-full outline outline-offset-2 outline-gray-300 outline-4">
                            <img src="https://inceptaimg.s3.amazonaws.com/leangap3.jpg" />
                        </div>
                    </div>
                    <div className="card-body flex flex-col gap-5">
                        <div>
                        <h2 className="card-title text-4xl">Nakul</h2>
                        <div className="badge badge-secondary font-1 badge-lg badge-outline">12th Grade</div>
                        </div>
                       
                        <p className="text-start text-2xl">"I got to pick mentors based on their expertise. Connecting with college students who shared their experiences helped me navigate my university choices."</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-base-300 w-full min-h-[40vh] gap-4 lg:p-40">
            <div className="grid w-full lg:grid-cols-2 grid-cols-1 lg:items-center lg:justify-items-center gap-10">
                <div className=" flex flex-col gap-5 p-20 lg:ml-20">
                    <div className="flex flex-col gap-6">
                        <p className="font-1 font-bold lg:text-6xl text-4xl leading-10">Choose the college that's right for you</p>
                    </div>
                    <div className="mt-6">
                        <p className="lg:text-2xl text-xl font-2 font-semibold leading-10">Start connecting with the students from your dream university today.</p>
                    </div>
                    <a href="/signup" className="btn btn-accent lg:p-30 rounded-lg w-5/6 lg:h-20 btn-lg mt-3">
                        <p className="font-1 font-bold text-lg lg:text-2xl">Connect Now</p>
                    </a>
                </div>
                <div className="lg:flex lg:flex-row gap-10 justify-evenly items-center hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-96 stroke-accent">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-96 lg:block hidden stroke-accent">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>
                </div>
            </div>
        </div>

        <div className="bg-base-100 justify-center justify-items-center flex flex-col gap-5">
            <p className="text-6xl font-1 font-bold underline text-center mt-20">FAQ:</p>

                
            <div className="collapse collapse-arrow bg-base-200 p-4 m-4 lg:w-2/3 w-full mx-auto outline outline-4 outline-gray-600 outline-offset-2">
                <input type="radio" name="my-accordion-1"/>
                <div className="collapse-title text-3xl font-medium">Is it free for college students or high school students?</div>
                <div className="collapse-content">
                    <p className="text-2xl">College students and High School students can sign up for free on the platform. However, for highschoolers to talk to college students, they need to pay a premium beforehand</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 p-4 m-4 lg:w-2/3 w-full mx-auto outline outline-4 outline-gray-600 outline-offset-2">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-3xl font-medium">How is quality of college mentors guaranteed for high school students?</div>
                <div className="collapse-content">
                    <p className="text-2xl">College students who want to be in the program are vetted through an interview process.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 p-4 m-4 lg:w-2/3 w-full mx-auto outline outline-4 outline-gray-600 outline-offset-2">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-3xl font-medium">How do conversations work?</div>
                <div className="collapse-content">
                    <p className="text-2xl">Each conversation costs a certain amount of credits, where the lowest amount of credits for a conversation is 85. You can buy credits on the pricing page.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 p-4 m-4 lg:w-2/3 w-full mx-auto outline outline-4 outline-gray-600 outline-offset-2">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-3xl font-medium">How do college students get paid?</div>
                <div className="collapse-content">
                    <p className="text-2xl">Every texting conversation that a college student engages in pays a base rate of $4.00. Every video call a college student engages in results in a base pay of $20 for a 30 minute call. After getting $50 or more across all of their conversations, they can cash out.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 p-4 m-4 lg:w-2/3 w-full mx-auto outline outline-4 outline-gray-600 outline-offset-2 mb-20">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-3xl font-medium">Is there a free trial?</div>
                <div className="collapse-content">
                    <p className="text-2xl">There is not a free trial. After buying credits, you can begin to use the website.</p>
                </div>
            </div>
        </div>
        
        <Footer />
        

        



        </>
    )
}
