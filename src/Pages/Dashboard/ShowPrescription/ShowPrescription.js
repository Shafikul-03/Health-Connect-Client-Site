import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./ShowPrescription.css";

const ShowPrescription = () => {
  const booking = useLoaderData();
  //   console.log(booking.prescription[0]);
  const { advices, complaints, tests, treatment, followUp } =
    booking.prescription[0];
  console.log(treatment);
  const [loader, setLoader] = useState(false);
  //   console.log(booking);

  const downloadPDF = () => {
    console.log("clicked");
    const capture = document.querySelector(".actual-receipt");
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("receipt.pdf");
    });
    // var doc = new jsPDF("p", "pt");

    // doc.text(20, 20, "This is the first page title.");

    // doc.setFont("helvetica");
    // doc.setFontType("normal");
    // doc.text(20, 60, "This is the content area.");
    // doc.addPage();
    // this code creates new page in pdf document
    // doc.setFont("helvetica");
    // doc.setFontType("normal");
    // doc.text(20, 100, "This is the second page.");

    // doc.save("sample-file.pdf");
  };
  return (
    <div className=" prescription w-full relative">
      <div className="flex justify-center">
        <div className="receipt-box">
          {/* actual receipt */}
          <div className="actual-receipt">
            {/* organization logo */}

            {/* organization name */}
            <div className="doctor-section">
              <h3 className="doctor-name"> {booking.doctorName}</h3>
              <div className="doctor-info">
                <small>MBBS,PGT(ENT)</small>
                <br />
                <span>BMDC Reg No - A62931</span>
              </div>
            </div>

            <div className="patient-info">
              <h2>Patient's Name: {booking.patient} </h2>
              <p>
                {/* Email: <a href={`mailto:${booking.email}`}>{booking.email}</a> */}
                Age: 45
              </p>
              <p>Phone: {booking.phone}</p>
              {/* <h6>Appointment was on: {booking.appointmentDate}</h6> */}
            </div>

            <div className="main-part">
              <div className="cc">
                <div>
                  <span className="medicine-name">Chief Complaints</span>
                  <div className="data-row">
                    <ul>
                      {complaints.map((complaint, index) => (
                        <li>
                          {index + 1}. {complaint.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <span className="medicine-name">Tests</span>
                  <div className="data-row">
                    <ul>
                      {tests.map((complaint, index) => (
                        <li>
                          {index + 1}. {complaint.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="medicine">
                <div className=" medicine-container">
                  <span className="medicine-name">Rx</span>
                  {treatment.map((item, index) => (
                    <div className="single-medicine">
                      {console.log(item)}
                      <div className="medicine-name">
                        {index + 1 + " . "}
                        {item[`medicine${index}`].value}
                      </div>
                      <div className="medicine-info">
                        <span>{item[`schedules${index}`]}</span>
                        <span>{item[`meal${index}`]} meal</span>
                        <span>{item[`NumberOfDays${index}`]} days</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="">
                  <span className="medicine-name">Advices</span>
                  <div className="data-row border-bottom">
                    <ul>
                      {advices.map((complaint, index) => (
                        <li>
                          {index + 1}. {complaint.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="">
                  <span className="medicine-name">
                    Follow up within: {followUp}{" "}
                  </span>
                </div>
              </div>
            </div>

            {/* <div className="colored-row first">
              <span>Chief Complaints</span>
              <span></span>
            </div>

            <div className="data-row">
              <ul>
                {complaints.map((complaint, index) => (
                  <li>
                    {index + 1}. {complaint.value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="colored-row">
              <span>Tests</span>
            </div>

            <div className="data-row border-bottom">
              <ul>
                {tests.map((complaint, index) => (
                  <li>
                    {index + 1}. {complaint.value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="colored-row">
              <span>Medicine(s)</span>
            </div>

            <div className="data-row">
              <table className=" table tb ">
                <tr>
                  <th>Name</th>
                  <th>No. of days</th>
                  <th>Schedule</th>
                  <th>
                    Before/After
                    <br /> Meal
                  </th>
                </tr>
                {treatment.map((item, index) => (
                  <tr>
                    {console.log(item)}
                    <td>{item[`medicine${index}`].value}</td>
                    <td>{item[`NumberOfDays${index}`]}</td>
                    <td>{item[`schedules${index}`]}</td>
                    <td>{item[`meal${index}`]}</td>
                  </tr>
                ))}
              </table>
            </div> */}

            {/* <div className="data-row border-bottom">
              <ul>
                {advices.map((complaint, index) => (
                  <li>
                    {index + 1}. {complaint.value}
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <button
        className="receipt-modal-download-button absolute right-2 top-0 "
        onClick={downloadPDF}
        disabled={!(loader === false)}
      >
        {loader ? <span>Downloading</span> : <span>Download</span>}
      </button>
    </div>
  );
};

export default ShowPrescription;
