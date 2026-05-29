import { useContext, useEffect, useState } from "react";

import {
  getAllRequests,
  approveRequest,
  rejectRequest,
} from "../services/sellerRequestService";

import { AuthContext } from "../context/AuthContext";

function AdminDashboard() {
  const { token } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const data = await getAllRequests(token);

    setRequests(data.requests);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    await approveRequest(id, token);

    fetchRequests();
  };

  const handleReject = async (id) => {
    await rejectRequest(id, token);

    fetchRequests();
  };

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">Admin Dashboard 👨‍💼</h1>

        <div className="space-y-5">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white p-6 rounded-xl shadow-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">{request.user?.name}</h2>

                <p>{request.user?.email}</p>

                <p>Status: {request.status}</p>
              </div>

              {request.status === "pending" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(request._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
