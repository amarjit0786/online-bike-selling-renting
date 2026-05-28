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

        setBookings(data.bookings);

      } catch (error) {

        setError("Failed to fetch bookings");

      } finally {

        setLoading(false);
      }
    };

    fetchBookings();

  }, [token]);



  // LOADING
  if (loading) {
    return (
      <div className="text-center text-3xl mt-20">
        Loading bookings... ⏳
      </div>
    );
  }



  // ERROR
  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl mt-20">
        {error}
      </div>
    );
  }



  return (
    <section className="min-h-screen bg-gray-100 py-16">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-12">
          My Bookings 📋
        </h1>


        {/* BOOKINGS GRID */}
        <div className="grid md:grid-cols-2 gap-8">

          {bookings.length > 0 ? (

            bookings.map((booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >

                {/* IMAGE */}
                <img
                  src={booking.bike?.image}
                  alt={booking.bike?.title}
                  className="w-full h-64 object-cover"
                />


                {/* CONTENT */}
                <div className="p-8">

                  <h2 className="text-3xl font-bold">
                    {booking.bike?.title}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {booking.bike?.brand}
                  </p>


                  {/* DATES */}
                  <div className="mt-6 space-y-3">

                    <p>
                      📅 Start:
                      {" "}
                      {new Date(
                        booking.startDate
                      ).toLocaleDateString()}
                    </p>

                    <p>
                      📅 End:
                      {" "}
                      {new Date(
                        booking.endDate
                      ).toLocaleDateString()}
                    </p>

                    <p>
                      ⌛ Days:
                      {" "}
                      {booking.totalDays}
                    </p>

                    <p className="text-2xl font-bold text-yellow-500">
                      💰 ₹{booking.totalPrice}
                    </p>

                  </div>


                  {/* STATUS */}
                  <div className="mt-6">

                    <span
                      className={`px-4 py-2 rounded-full text-white font-semibold
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

              </div>
            ))

          ) : (

            <h2 className="text-3xl">
              No bookings found 🚫
            </h2>

          )}

        </div>
      </div>
    </section>
  );
}

export default MyBookingsPage;