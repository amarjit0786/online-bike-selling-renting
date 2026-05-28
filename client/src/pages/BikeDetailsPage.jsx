import { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";

import { getSingleBike } from "../services/bikeService";

import { AuthContext } from "../context/AuthContext";
import { createBooking } from "../services/bookingService";

function BikeDetailsPage() {
  const { id } = useParams();

  const [bike, setBike] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  const [startDate, setStartDate] = useState("");

  const [endDate, setEndDate] = useState("");

  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const data = await getSingleBike(id);

        setBike(data.bike);
      } catch (err) {
        setError("Failed to fetch bike details");
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
  }, [id]);

  // LOADING
  if (loading) {
    return (
      <div className="text-center text-3xl mt-20 font-bold">
        Loading Bike Details... ⏳
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl mt-20">{error}</div>
    );
  }

  const handleBooking = async () => {
    try {
      const data = await createBooking(
        {
          bikeId: bike._id,
          startDate,
          endDate,
        },
        token,
      );

      setBookingMessage(data.message);
    } catch (error) {
      setBookingMessage(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* IMAGE */}
          <div>
            <img
              src={bike.image}
              alt={bike.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="p-8 flex flex-col justify-center">
            <h1 className="text-5xl font-bold">{bike.title}</h1>

            <p className="text-gray-500 text-xl mt-3">{bike.brand}</p>

            <p className="mt-6 text-gray-700 leading-relaxed">
              {bike.description}
            </p>

            {/* INFO */}
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-semibold">
                💰 Price: ₹{bike.price}
              </h2>

              <h2 className="text-2xl font-semibold">
                🔑 Rent Per Day: ₹{bike.rentPerDay}
              </h2>

              <h2 className="text-xl text-gray-700">
                📅 Model Year: {bike.year}
              </h2>

              <h2 className="text-xl text-gray-700">
                🏍️ Category: {bike.category}
              </h2>
            </div>

            {/* SELLER */}
            <div className="mt-8 p-5 bg-gray-100 rounded-xl">
              <h2 className="text-2xl font-bold mb-3">Seller Information</h2>

              <p>👤 {bike.seller?.name}</p>

              <p>📧 {bike.seller?.email}</p>
            </div>
            <div className="mt-8 flex gap-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-3 rounded-lg"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-3 rounded-lg"
              />
            </div>

            {/* BUTTONS */}
            <div className="mt-10 flex gap-4">
              <button
                onClick={handleBooking}
                className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
              >
                Rent Now
              </button>

              <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition">
                Buy Now
              </button>

            </div>
              {bookingMessage && (
                <p className="mt-6 text-green-600 font-semibold">
                  {bookingMessage}
                </p>
              )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BikeDetailsPage;
