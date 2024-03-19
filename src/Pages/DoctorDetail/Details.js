import React from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import BookingModal from "../Appointment/BookingModal/BookingModal";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Shared/Loading/Loading";
import SpecificDoctorBooking from "../SpecificDoctorBooking/SpecificDoctorBooking";
const Details = () => {
  const [treatment, setTreatment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { image, name, specialty, biodata, experience } = useLoaderData();
  console.log(specialty);
  const date = format(selectedDate, "PP");
  const {
    data: appointmentOption = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", specialty],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/appointmentOptions/appointmentDetails?name=${specialty}`
      );
      const data = await res.json();
      // setTreatment(data);
      return data;
    },
  });
  // const handleAppointment = () => {
  //   console.log(appointmentOption);
  //   setTreatment(appointmentOption);
  // };
  console.log(selectedDate, treatment, setTreatment);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="card card-compact  bg-base-100 shadow-xl mx-72 my-6 ">
      <figure>
        <img src={image} className="h-96 w-3/4 rounded-xl" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-bold justify-center  ">
          Name:<span className="text-cyan-700">{name} </span>
        </h2>
        <h2 className="card-title text-2xl justify-center font-semibold">
          Department: <span className="text-cyan-700">{specialty} </span>
        </h2>
        <h2 className="card-title text-2xl justify-center font-semibold">
          Experience: <span className="text-cyan-700">{experience} </span> Year
        </h2>
        <h2 className="card-title text-xl justify-center text-center font-semibold">
          <span className="text-cyan-700 font-normal">{biodata} </span>
        </h2>
        <div className="card-actions justify-end">
          {/* <PrimaryButton onClick={handleAppointment}>
            Book Appointment
          </PrimaryButton> */}
          <label
            // disabled={slots.length === 0}
            htmlFor="booking-modal"
            className="btn btn-primary text-white"
            onClick={() => setTreatment(appointmentOption)}
          >
            Book Appointment
          </label>
          {/* <PrimaryButton>
           <Link to="/appointment">Book Appointment</Link>
        </PrimaryButton> */}
        </div>
      </div>
      {
        <SpecificDoctorBooking
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          treatment={appointmentOption}
          setTreatment={setTreatment}
          refetch={refetch}
          doctorName={name}
        ></SpecificDoctorBooking>
      }
    </div>
  );
};

export default Details;
