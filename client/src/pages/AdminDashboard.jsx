import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    setRequests(data.requests || []); // Safety check: Agar data na aaye to app crash na ho
  };

  useEffect(() => {
    if (token) {
      fetchRequests();
    }
  }, [token]); // Token dependency add ki taaki jab token mile tabhi call ho

  const handleApprove = async (id) => {
    await approveRequest(id, token);
    fetchRequests(); // Approve hone ke baad list refresh
  };

  const handleReject = async (id) => {
    await rejectRequest(id, token);
    fetchRequests(); // Reject hone ke baad list refresh
  };

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">Admin Dashboard 👨‍💼</h1>

        {/* --- NAveIGATION LINKS SECTION (Upar ya niche sahi se wrap kiya) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <Link to="/admin/users" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-xl font-semibold flex items-center gap-2">
            👥 Users
          </Link>

          <Link to="/admin/bikes" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-xl font-semibold flex items-center gap-2">
            🏍️ Bikes
          </Link>

          <Link to="/admin/bookings" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition text-xl font-semibold flex items-center gap-2">
            📋 Bookings
          </Link>
        </div>

        {/* --- REQUESTS LIST SECTION --- */}
        <h2 className="text-2xl font-bold mb-5">Seller Requests</h2>
        <div className="space-y-5">
          {requests.length === 0 ? (
            <p className="text-gray-500 bg-white p-6 rounded-xl text-center shadow">No pending requests found.</p>
          ) : (
            requests.map((request) => (
              <div
                key={request._id}
                className="bg-white p-6 rounded-xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h2 className="text-xl font-bold">{request.user?.name || "Unknown User"}</h2>
                  <p className="text-gray-600">{request.user?.email || "No Email"}</p>
                  <p className="mt-2 text-sm font-semibold text-amber-600">
                    Status: <span className="uppercase">{request.status}</span>
                  </p>
                </div>

                {request.status === "pending" && (
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => handleApprove(request._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(request._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition duration-200"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;