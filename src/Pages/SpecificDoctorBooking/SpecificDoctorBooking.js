import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

// import Loading from "../../Shared/Loading/Loading";
import { AuthContext } from "../../contexts/AuthProvider";
import Loading from "../Shared/Loading/Loading";
import { DayPicker } from "react-day-picker";

const SpecificDoctorBooking = ({
  treatment,
  setTreatment,
  selectedDate,
  setSelectedDate,
  refetch,
  doctorName,
  data,
}) => {
  // treatment is just another name of appointmentOptions with name, slots, _id
  const { name: treatmentName, slots, price } = treatment;
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);

  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(today.getDate() + 10);
  const isDateDisabled = maxSelectableDate;

  useEffect(() => {
    fetch(`http://localhost:5000/getDoctorsBySpecialty/${treatment.name}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctor(data);
        // console.log(data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [treatment.name]);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const docName = form.doctorName.value;

    const booking = {
      appointmentDate: date,
      treatment: treatmentName,
      patient: name,
      slot,
      email,
      phone,
      price,
      doctorName: docName,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("Booking confirmed");
          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />

      <div className="modal">
        <div>
          <DayPicker
            className="bg-white "
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={{ before: today }}
            hidden={{ after: isDateDisabled }}
          />
        </div>
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{treatmentName}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              type="text"
              disabled
              value={date}
              className="input w-full input-bordered "
            />
            <select
              name="slot"
              className="select select-bordered w-full"
              required
            >
              {slots.map((slot, i) => (
                <option value={slot} key={i}>
                  {slot}
                </option>
              ))}
            </select>

            <select name="doctorName" className="select select-bordered w-full">
              {doctorName ? (
                <option defaultValue={doctorName} value={doctorName}>
                  {doctorName}
                </option>
              ) : doctor?.length ? (
                doctor?.map((doc, i) => (
                  <option value={doc.name} key={i}>
                    {doc.name}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>

            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              // disabled
              placeholder="Your Name"
              className="input w-full input-bordered"
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              placeholder="Email Address"
              className="input w-full input-bordered"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input w-full input-bordered"
            />

            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default SpecificDoctorBooking;
