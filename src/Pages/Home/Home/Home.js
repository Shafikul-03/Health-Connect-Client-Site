import React from "react";
import Banner from "../Banner/Banner";
import InfoCards from "../InfoCards/InfoCards";
import MakeAppointment from "../MakeAppointment/MakeAppointment";
import Testimonial from "../Testimonial/Testimonial";
import Doctors from "../../DoctorsInfo/Doctors";

const Home = () => {
  return (
    <div className="mx-5">
      <Banner></Banner>
      <Doctors></Doctors>
      <InfoCards></InfoCards>
      <MakeAppointment></MakeAppointment>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
