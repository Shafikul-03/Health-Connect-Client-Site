import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DoctorInfoCard from "./DoctorInfoCard";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const Doctors = () => {
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/doctor-list")
      .then((res) => res.json())
      .then((data) => setDoctor(data));
  }, []);
  return (
    <div className="mx-center">
      <div className="text-center mb-4 mt-12">
      <h2 className="text-2xl font-bold text-cyan-600">All Doctors</h2>
      </div>
      <div className="grid lg:ml-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {doctor.map((doc) => (
          <DoctorInfoCard key={doc._id} doc={doc}></DoctorInfoCard>
        ))}
      </div>
      <div className="mt-8 mb-6 flex justify-center">
        <PrimaryButton>
          <Link to={`/all-doctors`}>Find All Doctors</Link>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Doctors;
