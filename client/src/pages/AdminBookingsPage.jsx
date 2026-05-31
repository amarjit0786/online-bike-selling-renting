import { useContext, useEffect, useState } from "react";

import { getAllBookings } from "../services/adminService";

import { AuthContext } from "../context/AuthContext";
import AdminLayout from "../components/admin/AdminLayout";

function AdminBookingsPage() {
  const { token } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getAllBookings(token);

      setBookings(data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <AdminLayout>
      <section className="min-h-screen bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-10">Bookings 📋</h1>

          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* USER */}
                  <div>
                    <h2 className="text-xl font-bold mb-3">User</h2>

                    <p>{booking.user?.name}</p>

                    <p>{booking.user?.email}</p>
                  </div>

                  {/* BIKE */}
                  <div>
                    <h2 className="text-xl font-bold mb-3">Bike</h2>

                    <img
                      src={booking.bike?.image}
                      alt={booking.bike?.title}
                      className="h-32 rounded-lg mb-3"
                    />

                    <p>{booking.bike?.title}</p>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <strong>Start Date</strong>

                    <p>{new Date(booking.startDate).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <strong>End Date</strong>

                    <p>{new Date(booking.endDate).toLocaleDateString()}</p>
                  </div>

                  <div>
                    <strong>Total Days</strong>

                    <p>{booking.totalDays}</p>
                  </div>

                  <div>
                    <strong>Total Price</strong>

                    <p>₹{booking.totalPrice}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <span
                    className={`px-4 py-2 rounded-full text-white
                    ${
                      booking.status === "confirmed"
                        ? "bg-green-500"
                        : booking.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default AdminBookingsPage;
