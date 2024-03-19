import React from "react";
import quote from "../../../assets/icons/quote.svg";
import people1 from "../../../assets/images/people1.png";
import people2 from "../../../assets/images/people2.png";
import people3 from "../../../assets/images/people3.png";
import Review from "./Review";

const Testimonial = () => {
  const reviews = [
    {
      _id: 1,
      name: "Shafiqul Islam",
       img: people1,
      review:
        "Health Connect is Very User Friendly, Hassle free doctor appointment platform",
      location: "Patharghata, Barguna",
    },
    {
      _id: 2,
      name: "Rokeya Khanom", 
      img: people2,
      review:
        "Easy and Hassle free Doctor Appointment system,Best Of Luck",
      location: "Rajapur, Jhalokathi",
    },
    {
      _id: 3,
      name: "Winson Herry",
      img: people3,
      review:
        "It is a long established fact that by the readable content of a lot layout.",
      location: "Bakergonj, Barishal",
    },
  ];

  return (
    <section className="my-12">
      <div className="text-center">
      <h2 className="text-xl text-primary font-bold">TESTIMONIAL</h2>
          <h3 className="text-4xl">What Our Patients Says</h3>
      </div>
      <div className="flex justify-between">

        <figure>
          <img className="w-24 lg:w-12" src={quote} alt="" />
        </figure>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Review key={review._id} review={review}></Review>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
