import React from "react"
import Index from "./Index"
import Login from "./Login"
import Signup from "./Signup"
// import PricingPage from "./PricingPage"
import Main from "./Main"
import Terms from "./Terms"
import Privacy from "./Privacy"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Youtube from "./Youtube"
import ForgotPassword from "./ForgotPassword"

import SearchCollege from "./SearchCollege";


export default function App(props) {






    return (
        <>
        <BrowserRouter>
          <Routes>
            
            <Route index path="/" element={<Index />} />
            <Route index path="/login" element={<Login />} />
            <Route index path="/signup" element={<Signup />} />
            {/* <Route path="/pricing" element={<PricingPage />} /> */}
            <Route index path="/main" element={<Main />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            {/* <Route path="/search" element={<SearchCollege />} /> */}
            <Route index path="/terms" element={<Terms/>} />
            <Route index path="/privacy" element={<Privacy />} />
            <Route path="/opfiosdifkvxcznkpqpwefd" element={<Youtube source="youtube" />} />
            <Route path="/vnmcxvkiopqflvcxznkoif" element={<Youtube source="facebook" />} />
            <Route path="/fioqpwoemvnckzxoiopo" element={<Youtube source="instagram" />} />            
          </Routes>
        </BrowserRouter>



        </>
    )
}


