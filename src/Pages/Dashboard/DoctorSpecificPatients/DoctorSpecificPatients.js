import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const DoctorSpecificPatients = () => {
  const { user } = useContext(AuthContext);

  const url = `http://localhost:5000/doctor/bookings?doctorName=${user?.displayName}`;

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

  return (
    <div>
      <h3 className="text-3xl mb-5">My Appointments</h3>
      <div className="overflow-x-auto">
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Patient's Name</th>
              <th>Department</th>
              {/* <th>Patient's Name</th> */}
              <th>Date</th>
              <th>Time</th>
              <th>Prescribe</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.length ? (
              bookings?.map((booking, i) => (
                <tr key={booking._id}>
                  <th>{i + 1}</th>
                  <td>{booking.patient}</td>
                  <td>{booking.treatment}</td>
                  {/* <td>{booking.doctorName}</td> */}
                  <td>{booking.appointmentDate}</td>
                  <td>{booking.slot}</td>
                  <td>
                    {
                      <Link to={`/dashboard/prescribe/${booking?._id}`}>
                        <button className="btn btn-primary btn-sm">
                          Prescribe
                        </button>
                      </Link>
                    }
                  </td>
                  {/* <td>
                    {booking?.price && !booking.paid && (
                      <Link to={`/dashboard/payment/${booking?._id}`}>
                        <button className="btn btn-primary btn-sm">Pay</button>
                      </Link>
                    )}
                    {booking.price && booking.paid && (
                      <span className="text-green-500">Paid</span>
                    )}
                  </td> */}
                </tr>
              ))
            ) : (
              <>
                <h1 className="text-2xl font-semibold "> No Patient Yet</h1>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorSpecificPatients;
