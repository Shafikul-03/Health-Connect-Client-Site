import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const Requests = () => {
  const [deletingUser, setDeletingUser] = useState(null);

  const closeModal = () => {
    setDeletingUser(null);
  };

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/pendingRequests");
      const data = await res.json();
      return data;
    },
  });

  const handleApprove = (id) => {
    fetch(`http://localhost:5000/doctors/approve/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make doctor successful.");
          refetch();
        }
      });
  };

  const handleDeleteDoctor = (user) => {
    fetch(`http://localhost:5000/doctors/${user._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Request declined`);
        }
      });
  };

  return (
    <div>
      <h3 className="text-3xl mb-5">
        {" "}
        Total{" "}
        <span className="font-semibold text-yellow-700">
          {" "}
          {users?.length}
        </span>{" "}
        Requests
      </h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Approve</th>
              <th>Decline</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleApprove(user._id)}
                      className="btn btn-xs btn-primary"
                    >
                      Approve
                    </button>
                  )}
                </td>
                <td>
                  <label
                    onClick={() => setDeletingUser(user)}
                    htmlFor="confirmation-modal"
                    className="btn btn-sm btn-error"
                  >
                    Decline
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingUser && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you decline the request of ${deletingUser.name}. It cannot be undone.`}
          successAction={handleDeleteDoctor}
          successButtonName="Decline"
          modalData={deletingUser}
          closeModal={closeModal}
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default Requests;
