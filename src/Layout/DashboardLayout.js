import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import useDoctor from "../hooks/useDoctor";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  const [isDoctor] = useDoctor(user?.email);
  console.log(user);
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            <li className="bg-cyan-500 text-white rounded-lg mb-1">
              <Link to="/dashboard">My Appointments</Link>
            </li>
            {isAdmin && (
              <>
                <li className="bg-cyan-500 text-white rounded-lg mb-1">
                  <Link to="/dashboard/all-appointments">All Appointments</Link>
                </li>
                <li className="bg-cyan-500 text-white rounded-lg mb-1">
                  <Link to="/dashboard/allusers">All users</Link>
                </li>
                <li className="bg-cyan-500 text-white rounded-lg mb-1">
                  <Link to="/dashboard/requests">Requests</Link>
                </li>
                <li className="bg-cyan-500 text-white rounded-lg mb-1">
                  <Link to="/dashboard/adddoctor">Add A Doctor</Link>
                </li>
                <li className="bg-cyan-500 text-white rounded-lg ">
                  <Link to="/dashboard/manage-doctors">Manage Doctors</Link>
                </li>
              </>
            )}
            {isDoctor && (
              <>
                <li className="bg-cyan-500 text-white rounded-lg mb-1">
                  <Link to="/dashboard/my-patients">My Patients</Link>
                </li>
              </>
            )}
            <>
              <li className="bg-cyan-500 text-white rounded-lg mb-1">
                <Link to="/dashboard/my-prescriptions">My Prescriptions</Link>
              </li>
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
