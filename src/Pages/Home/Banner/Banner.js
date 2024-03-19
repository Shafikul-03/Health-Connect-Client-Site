import React from "react";
import chair from "../../../assets/images/becoming-doctor.jpg";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { Link } from "react-router-dom";
import moment from "moment";
import Marquee from "react-fast-marquee";

const Banner = () => {
  return (
    <>
       <div className="text-center">
               
            </div>
            <div className='d-flex'>
              
                <Marquee className='text-danger' speed={50}>
                <h3 className="mr-6 font-semibold text-cyan-800">{moment().format("dddd, MMMM D, YYYY")} </h3> 
                <h3 className="text-cyan-800 font-semibold"> Health Connect is a groundbreaking initiative to facilitate the next
            generation of healthcare for Bangladesh. </h3> 
                </Marquee>
            </div>
    

    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="rounded-lg lg:w-1/2 shadow-2xl" alt="" />
        <div>
          <h1 className="text-4xl font-bold">
            {" "}
            <span className="text-sky-800">HEALTH </span> CONNECT
          </h1>
          <p className="py-6 pr-5 text-justify text-lg font-semibold">
          The purpose of Health Connect app is to make healthcare services easier and ensure health consultancy all the time. User can take appointment of doctor connecting to the app by a simple registration..{" "}
          </p>
          <PrimaryButton>
            <Link to="/appointment">Book Appointment</Link>
          </PrimaryButton>
        </div>
      </div>
    </div>
    </>
  );
};

export default Banner;
