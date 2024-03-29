import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MyPrescriptions = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/bookings/myPrescriptons?email=${user?.email}`;

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();

      return data;
    },
  });
  console.log(bookings);
  if (bookings?.length === 0 || !bookings) {
    return (
      <div className="text-center">
        <div className="text-xl  font-extrabold ">You have no prescription</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-3xl mb-5">My Appointments</h3>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              {/* <th>Name</th> */}
              <th>Department</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Prescription</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.length ? (
              bookings?.map((booking, i) => (
                <tr key={booking._id}>
                  <th>{i + 1}</th>
                  {/* <td>{booking.patient}</td> */}
                  <td>{booking.treatment}</td>
                  <td>{booking.doctorName}</td>
                  <td>{booking.appointmentDate}</td>
                  <td>{booking.slot}</td>
                  <td>
                    {booking?.prescription?.length > 0 ? (
                      <Link to={`/dashboard/seePrescription/${booking?._id}`}>
                        <button className="btn btn-primary btn-sm">
                          See prescription
                        </button>
                      </Link>
                    ) : (
                      // <Link to={`/dashboard/payment/${booking?._id}`}>
                      <button className="btn btn-primary btn-sm">
                        Not yet
                      </button>
                      // </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <>
                <h1 className="text-2xl font-semibold "> No Appointment Yet</h1>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPrescriptions;
