import React from "react";
import Navbar from "../Navbar";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "../Footer";
import About from "./About";

function HomePage(){
    return(
        <>
       
        <Hero/>
        <Features/>
         <About/>
        </>
    )
}

export default HomePage;