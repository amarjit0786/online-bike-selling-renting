import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getMyBookings } from "../services/bookingService";

function MyBookingsPage() {
  const { token } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings(token);

        setBookings(data.bookings || []);
      } catch (error) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const totalSpent = bookings.reduce(
    (sum, booking) => sum + (booking.totalPrice || 0),
    0,
  );

  if (loading) {
    return (
      <div className="text-center text-3xl mt-20">Loading bookings... ⏳</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl mt-20">{error}</div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold mb-4">My Bookings 📋</h1>

        <div className="flex flex-wrap gap-4 mb-10">
          <div className="bg-white px-6 py-4 rounded-xl shadow">
            <h3 className="text-gray-500">Total Bookings</h3>

            <p className="text-3xl font-bold">{bookings.length}</p>
          </div>

          <div className="bg-white px-6 py-4 rounded-xl shadow">
            <h3 className="text-gray-500">Total Spent</h3>

            <p className="text-3xl font-bold text-green-600">₹{totalSpent}</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow text-center">
            <h2 className="text-3xl font-bold">No Bookings Found 🚫</h2>

            <p className="text-gray-500 mt-3">
              Book your first bike and it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <img
                  src={
                    booking.bike?.image || "https://via.placeholder.com/600x400"
                  }
                  alt={booking.bike?.title || "Bike"}
                  className="w-full h-64 object-cover"
                />

                <div className="p-8">
                  <h2 className="text-3xl font-bold">
                    {booking.bike?.title || "Bike Removed"}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {booking.bike?.brand || "N/A"}
                  </p>

                  <div className="mt-6 space-y-3">
                    <p>
                      📅 Start:{" "}
                      {new Date(booking.startDate).toLocaleDateString()}
                    </p>

                    <p>
                      📅 End: {new Date(booking.endDate).toLocaleDateString()}
                    </p>

                    <p>⌛ Days: {booking.totalDays}</p>

                    <p className="text-2xl font-bold text-yellow-500">
                      💰 ₹{booking.totalPrice}
                    </p>
                  </div>

                  <div className="mt-6">
                    <span
                      className={`px-4 py-2 rounded-full text-white font-semibold ${
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyBookingsPage;
