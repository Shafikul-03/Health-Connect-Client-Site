import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Calculators from "../../Pages/Home/Calculators/Calculators";
import AllDoctors from "../../Pages/AllDoctorsInfo/AllDoctors";
import Details from "../../Pages/DoctorDetail/Details";
import AllAppointments from "../../Pages/Dashboard/AllAppointments/AllAppointments";
import RequestToBeADoctor from "../../Pages/RequestToBeADoctor/RequestToBeADoctor";
import Requests from "../../Pages/Dashboard/Requests/Requests";
import DoctorSpecificPatients from "../../Pages/Dashboard/DoctorSpecificPatients/DoctorSpecificPatients";
import Prescribe from "../../Pages/Dashboard/Prescribe/Prescribe";
import MyPrescriptions from "../../Pages/Dashboard/MyPrescriptions/MyPrescriptions";
import ShowPrescription from "../../Pages/Dashboard/ShowPrescription/ShowPrescription";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/appointment",
        element: (
          <PrivateRoute>
            {" "}
            <Appointment></Appointment>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/all-doctors",
        element: <AllDoctors></AllDoctors>,
      },
      {
        path: "/bmi",
        element: <Calculators></Calculators>,
      },
      {
        path: "/doctors/:id",
        element: <Details></Details>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/doctors/${params.id}`),
      },
      {
        path: "/request-to-be-a-doctor",
        element: (
          <PrivateRoute>
            {" "}
            <RequestToBeADoctor></RequestToBeADoctor>{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/dashboard",
        element: <MyAppointment></MyAppointment>,
      },
      {
        path: "/dashboard/all-appointments",
        element: (
          <AdminRoute>
            <AllAppointments></AllAppointments>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/requests",
        element: (
          <AdminRoute>
            <Requests></Requests>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/adddoctor",
        element: (
          <AdminRoute>
            <AddDoctor></AddDoctor>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-doctors",
        element: (
          <AdminRoute>
            <ManageDoctors></ManageDoctors>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
      // Later
      {
        path: "/dashboard/prescribe/:id",
        element: <Prescribe></Prescribe>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
      {
        path: "/dashboard/my-patients",
        element: <DoctorSpecificPatients></DoctorSpecificPatients>,
        // loader: ({ params }) =>
        //   fetch(`http://localhost:5000/bookings/${params.id}`),
      },
      {
        path: "/dashboard/my-prescriptions",
        element: <MyPrescriptions></MyPrescriptions>,
        // loader: ({ params }) =>
        //   fetch(`http://localhost:5000/bookings/${params.id}`),
      },
      {
        path: "/dashboard/seePrescription/:id",
        element: <ShowPrescription></ShowPrescription>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
    ],
  },
]);

export default router;
