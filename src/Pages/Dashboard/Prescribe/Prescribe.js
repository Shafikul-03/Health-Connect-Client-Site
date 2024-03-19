import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const options = [
  { value: "Shortness of breath", label: "Shortness of breath" },
  { value: "Dizziness", label: "Dizziness" },
  { value: "High blood pressure", label: "High blood pressure" },
  { value: "Diabetes", label: "Diabetes" },
  { value: "Ankle swelling", label: "Ankle swelling" },
];
const healthTests = [
  { value: "Blood pressure measurement", label: "Blood pressure measurement" },
  { value: "Cholesterol test", label: "Cholesterol test" },
  { value: "Blood glucose test", label: "Blood glucose test" },
  { value: "Complete blood count (CBC)", label: "Complete blood count (CBC)" },
  { value: "Thyroid function test", label: "Thyroid function test" },
  { value: "Liver function test", label: "Liver function test" },
  { value: "Kidney function test", label: "Kidney function test" },
  {
    value: "Electrocardiogram (ECG or EKG)",
    label: "Electrocardiogram (ECG or EKG)",
  },
  {
    value: "MRI (Magnetic Resonance Imaging)",
    label: "MRI (Magnetic Resonance Imaging)",
  },
  {
    value: "CT scan (Computed Tomography)",
    label: "CT scan (Computed Tomography)",
  },
  { value: "X-ray", label: "X-ray" },
  { value: "Ultrasound scan", label: "Ultrasound scan" },
  { value: "Colonoscopy", label: "Colonoscopy" },
  { value: "Mammogram", label: "Mammogram" },
  { value: "Pap smear (Pap test)", label: "Pap smear (Pap test)" },
  {
    value: "Prostate-specific antigen (PSA) test",
    label: "Prostate-specific antigen (PSA) test",
  },
  { value: "Bone density test", label: "Bone density test" },
  { value: "HIV test", label: "HIV test" },
  {
    value: "STI (Sexually Transmitted Infection) test",
    label: "STI (Sexually Transmitted Infection) test",
  },
  { value: "Allergy test", label: "Allergy test" },
  { value: "Skin prick test", label: "Skin prick test" },
  {
    value: "Spirometry (lung function test)",
    label: "Spirometry (lung function test)",
  },
  {
    value: "DEXA scan (Dual-Energy X-ray Absorptiometry)",
    label: "DEXA scan (Dual-Energy X-ray Absorptiometry)",
  },
  { value: "Vision test", label: "Vision test" },
  { value: "Hearing test", label: "Hearing test" },
];
const healthAdvice = [
  { value: "Drink plenty of water", label: "Drink plenty of water" },
  { value: "Eat a balanced diet", label: "Eat a balanced diet" },
  { value: "Exercise regularly", label: "Exercise regularly" },
  { value: "Get enough sleep", label: "Get enough sleep" },
  { value: "Manage stress", label: "Manage stress" },
  { value: "Avoid smoking", label: "Avoid smoking" },
  { value: "Limit alcohol consumption", label: "Limit alcohol consumption" },
  { value: "Maintain a healthy weight", label: "Maintain a healthy weight" },
  { value: "Wash your hands regularly", label: "Wash your hands regularly" },
  { value: "Wear sunscreen", label: "Wear sunscreen" },
  // { value: "Practice safe sex", label: "Practice safe sex" },
  {
    value: "Stay up to date with vaccinations",
    label: "Stay up to date with vaccinations",
  },
  { value: "Get regular check-ups", label: "Get regular check-ups" },
  { value: "Practice good hygiene", label: "Practice good hygiene" },
  {
    value: "Avoid excessive sun exposure",
    label: "Avoid excessive sun exposure",
  },
  {
    value: "Eat more fruits and vegetables",
    label: "Eat more fruits and vegetables",
  },
  { value: "Limit processed foods", label: "Limit processed foods" },
  { value: "Reduce salt intake", label: "Reduce salt intake" },
  { value: "Floss your teeth daily", label: "Floss your teeth daily" },
  { value: "Stretch regularly", label: "Stretch regularly" },
  {
    value: "Practice mindfulness or meditation",
    label: "Practice mindfulness or meditation",
  },
  { value: "Take breaks from screens", label: "Take breaks from screens" },
  { value: "Stay socially connected", label: "Stay socially connected" },
  { value: "Learn to say no", label: "Learn to say no" },
  { value: "Seek support when needed", label: "Seek support when needed" },
];

const schedules = [
  { id: 0, schedule: "How many times in a day?" },
  { id: 1, schedule: "1+0+1" },
  { id: 2, schedule: "1+1+1" },
  { id: 3, schedule: "1+0+0" },
  { id: 4, schedule: "0+0+1" },
  { id: 5, schedule: "0+1+0" },
  { id: 6, schedule: "1+1+1+1" },
  { id: 7, schedule: "0+1+1" },
];

const commonMedicines = [
  { value: "Paracetamol", label: "Paracetamol" },
  { value: "Ibuprofen", label: "Ibuprofen" },
  { value: "Aspirin", label: "Aspirin" },
  { value: "Ciprofloxacin", label: "Ciprofloxacin" },
  { value: "Azithromycin", label: "Azithromycin" },
  { value: "Amoxicillin", label: "Amoxicillin" },
  { value: "Metronidazole", label: "Metronidazole" },
  { value: "Ranitidine", label: "Ranitidine" },
  { value: "Omeprazole", label: "Omeprazole" },
  { value: "Lansoprazole", label: "Lansoprazole" },
  { value: "Famotidine", label: "Famotidine" },
  { value: "Domperidone", label: "Domperidone" },
  { value: "Cetirizine", label: "Cetirizine" },
  { value: "Loratadine", label: "Loratadine" },
  { value: "Diazepam", label: "Diazepam" },
  { value: "Fluoxetine", label: "Fluoxetine" },
  { value: "Amlodipine", label: "Amlodipine" },
  { value: "Atenolol", label: "Atenolol" },
  { value: "Metformin", label: "Metformin" },
  { value: "Glibenclamide", label: "Glibenclamide" },
  { value: "Insulin", label: "Insulin" },
  { value: "Simvastatin", label: "Simvastatin" },
  { value: "Losartan", label: "Losartan" },
  { value: "Atorvastatin", label: "Atorvastatin" },
  { value: "Cefixime", label: "Cefixime" },
  { value: "Diclofenac", label: "Diclofenac" },
  { value: "Pantoprazole", label: "Pantoprazole" },
];

const Prescribe = () => {
  const navigate = useNavigate();
  const booking = useLoaderData();
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const navigation = useNavigation();
  const {
    treatment,
    price,
    appointmentDate,
    slot,
    patient,
    phone,
    doctorName,
    prescription,
  } = booking;
  // console.log(booking);

  const [complaints, setComplaints] = useState([]);
  const [medicines, setMedicines] = useState([0, 1]);
  const [mediObj, setMediObj] = useState({});
  const [medicineName, setmedicineName] = useState([]);
  const [tests, setTests] = useState([]);
  const [advices, setAdvices] = useState([]);

  const handleChange = (complaints) => {
    setComplaints(complaints || []);
  };
  const handleTests = (tests) => {
    setTests(tests || []);
  };
  const handleAdvices = (tests) => {
    setAdvices(tests || []);
  };

  const handleClick = () => {
    setMedicines([...medicines, 1]);
  };
  const handleMedicines = (medicine, index) => {
    setmedicineName([...medicineName, medicine]);
    setMediObj({ ...mediObj, [index]: medicine });
  };
  const handlePrescription = (data) => {
    // console.log("complaints", complaints);
    // console.log(data);
    // console.log(data);
    let treatment = [];
    for (let i = 0; i < medicines.length; i++) {
      treatment.push({
        [`NumberOfDays${i}`]: data[`NumberOfDays${i}`],
        [`meal${i}`]: data[`meal${i}`],
        [`medicine${i}`]: mediObj[i],
        [`schedules${i}`]: data[`schedules${i}`],
      });
    }
    // console.log("Treatment", treatment);
    // console.log("Advices", advices);
    // console.log("Tests", tests);

    const obj = {
      complaints,
      treatment,
      advices,
      tests,
      followUp: data.followUp || "2 weeks",
      patient,
      doctorName,
    };
    fetch("http://localhost:5000/addPrescription", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        // authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((result) => {
        //  console.log(result);
        toast.success(`Prescription is sent successfully`);
        // navigate("/dashboard/manage-doctors");
      });
  };
  return (
    <div className="relative">
      {prescription && (
        <div className="absolute top-2 right-2 border p-3">
          You have already prescribed! <br />
          <Link to={`/dashboard/seePrescription/${booking?._id}`}>
            {" "}
            <span className="font-bold">See prescription here </span>
          </Link>
        </div>
      )}
      <div className=" p-5 m-3">
        <span className="font-bold text-xl "> Patient's Information:</span>
        <div className="m-2">
          <span className="font-bold">Patient's Name: </span> {patient}{" "}
          <span className="font-bold ml-4">Phone </span>
          {phone}
        </div>
      </div>
      <div className=" p-5 m-3">
        <span className="font-bold text-xl "> Chief Complaints:</span>
        <form onSubmit={handleSubmit(handlePrescription)} className="mt-4">
          {/* Complaints */}
          <Select
            className="w-3/4"
            options={options}
            onChange={handleChange}
            value={complaints}
            isMulti
          />
          {/* <button>Next</button> */}
          {/* Treatment */}
          <div className="mt-5">
            <span className="font-bold text-xl "> Treatment:</span>
            {medicines.map((value, index) => (
              <div className="mt-3">
                <small className="text-xs mb-2"> {index + 1}. </small>
                <div>
                  {/* Medicine Name */}
                  <Select
                    placeholder="Enter medicine name"
                    className=" input-bordered mb-2 max-w-xs ms-3"
                    options={commonMedicines}
                    onChange={(value) => handleMedicines(value, index)}
                    value={mediObj[index]}
                    // isMulti
                  />

                  <select
                    {...register(`schedules${index}`)}
                    className="select input-bordered w-full max-w-xs ms-3"
                  >
                    {schedules.map((schedule) => (
                      <option key={schedule._id} value={schedule.name}>
                        {schedule.schedule}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-3">
                  <input
                    type="number"
                    placeholder="For how many days"
                    {...register(`NumberOfDays${index}`, {
                      required: true,
                    })}
                    className="input input-bordered w-full max-w-xs mr-5"
                  />
                  <select
                    {...register(`meal${index}`)}
                    className="select input-bordered w-full max-w-xs ms-3"
                  >
                    <option key="0" defaultValue=""></option>
                    <option key="1" value="before">
                      Before Meal
                    </option>
                    <option key="2" value="after">
                      After Meal
                    </option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          <div className="border w-3/4 mt-5 flex justify-center ">
            <button
              onClick={handleClick}
              className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white w-3/4 "
            >
              Add More
            </button>
          </div>
          {/* Test  */}

          <div className=" p-5 m-3">
            <span className="font-bold text-xl "> Tests:</span>

            <Select
              className="w-3/4"
              options={healthTests}
              onChange={handleTests}
              value={tests}
              isMulti
            />
          </div>
          <div className=" p-5 m-3">
            <span className="font-bold text-xl "> Advices:</span>

            <Select
              className="w-3/4"
              options={healthAdvice}
              onChange={handleAdvices}
              value={advices}
              isMulti
            />
          </div>
          {/* {Follow Up} */}
          <div className=" p-5 m-3">
            <span className="font-bold text-xl "> Next follow-up:</span>
            <br />
            <input
              type="text"
              {...register(`followUp`, {
                required: true,
              })}
              placeholder="Enter duration of next follow up  "
              className="input input-bordered w-full max-w-xs mt-2 mr-5  "
            />
          </div>

          <input
            className="btn btn-primary mt-4  w-80"
            value="Submit Prescription"
            type="submit"
          />
        </form>
      </div>

      {/* Advices  */}
    </div>
  );
};

export default Prescribe;
