
import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';


const AllAppointments = () => {
   
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
      fetch("http://localhost:5000/booking")
        .then((res) => res.json())
        .then((data) => setBookings(data));
    }, []);

    

    return (
        <div>
            <h3 className="text-3xl mb-5"> Total <span className='font-semibold text-yellow-700'> {bookings?.length}</span> Appointments Recorded</h3>
            <div className="overflow-x-auto">
                <table className="table w-full ">
                    <thead >
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Doctor Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Phone</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                         {
                            bookings?.length ? 
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i + 1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.doctorName}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>{booking.phone}</td>
                                <td>
                                    {
                                        booking?.price && !booking.paid && <Link
                                            to={`/dashboard/payment/${booking?._id}`}
                                        >
                                            <button
                                                className='btn btn-primary btn-sm'
                                            >Pay</button>
                                        </Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span className='text-green-500'>Paid</span>
                                    }
                                </td>
                            </tr>
                            ) : <> </>
                        } 
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllAppointments;