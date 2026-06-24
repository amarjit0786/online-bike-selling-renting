import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getSingleBike } from "../services/bikeService";
import { AuthContext } from "../context/AuthContext";
import { createBooking, getBikeBookings } from "../services/bookingService";
import FakePaymentModal from "../components/FakePaymentModal";
import usePageTitle from "../hooks/usePageTitle";
import { buyBike } from "../services/orderService";

function BikeDetailsPage() {
  usePageTitle("CityGlide | Bike Details");
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [buyLoading, setBuyLoading] = useState(false);

  // 1. Fetch Bookings ko alag se wrap kiya taaki payment ke baad ise dubara call kiya ja sake
  const fetchBookings = useCallback(async () => {
    try {
      const data = await getBikeBookings(id);
      setBookedDates(data.bookings || []);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const data = await getSingleBike(id);
        setBike(data.bike);
      } catch (error) {
        setError("Failed to fetch bike details");
      } finally {
        setLoading(false);
      }
    };

    fetchBike();
    fetchBookings();
  }, [id, fetchBookings]);

  // Derived Values
  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
        ) + 1
      : 0;

  const totalPrice = totalDays > 0 && bike ? totalDays * bike.rentPerDay : 0;

  // Validations
  const validateBooking = () => {
    if (!token) {
      setBookingMessage("Please login first 🔑");
      setBookingSuccess(false);
      return false;
    }

    if (!startDate || !endDate) {
      setBookingMessage("Please select start and end date 📅");
      setBookingSuccess(false);
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start < today) {
      setBookingMessage("Start date cannot be in the past ⏳");
      setBookingSuccess(false);
      return false;
    }

    if (end < start) {
      setBookingMessage("End date must be after start date ⏱️");
      setBookingSuccess(false);
      return false;
    }

    return true;
  };

  const isDateRangeAvailable = () => {
    if (!startDate || !endDate) return true;

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let booking of bookedDates) {
      const bookedStart = new Date(booking.startDate);
      const bookedEnd = new Date(booking.endDate);

      if (start <= bookedEnd && end >= bookedStart) {
        setBookingMessage("❌ This bike is already booked for selected dates");
        setBookingSuccess(false);
        return false;
      }
    }

    return true;
  };

  const handlePaymentSuccess = async () => {
    setBookingMessage("");

    if (!validateBooking()) return;
    if (!isDateRangeAvailable()) {
      setShowPayment(false);
      return;
    }

    try {
      setBookingLoading(true);

      await createBooking(
        {
          bikeId: bike._id,
          startDate,
          endDate,
        },
        token,
      );

      setBookingSuccess(true);
      setBookingMessage("🎉 Payment Successful & Bike Booked!");

      // Reset Input fields
      setStartDate("");
      setEndDate("");

      // 2. FIXED: New booked dates ko fetch karke UI par unavailable dates update kiye!
      await fetchBookings();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Booking failed";
      setBookingSuccess(false);
      setBookingMessage(errorMessage);
      alert(errorMessage);
    } finally {
      setBookingLoading(false);
      setShowPayment(false);
    }
  };

  // buy button handle
  const handleBuyBike = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const confirmBuy = window.confirm(`Buy this bike for ₹${bike.price}?`);

      if (!confirmBuy) return;

      const data = await buyBike(bike._id, token);

      alert(data.message);

      fetchBike();
    } catch (error) {
      alert(error.response?.data?.message || "Purchase failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-3xl mt-20 font-bold text-gray-700 animate-pulse">
        Loading Bike Details... ⏳
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-2xl mt-20 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* IMAGE */}
          <div className="h-64 md:h-auto min-h-[400px]">
            <img
              src={bike.image}
              alt={bike.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900">
              {bike.title}
            </h1>
            <p className="text-blue-600 font-semibold text-lg mt-2 uppercase tracking-wider">
              {bike.brand}
            </p>

            <p className="mt-6 text-gray-600 leading-relaxed text-sm sm:text-base">
              {bike.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Selling Price
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  ₹{bike.price}
                </h2>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Rent Per Day
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-blue-600">
                  ₹{bike.rentPerDay}/day
                </h2>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Model Year
                </p>
                <h2 className="text-sm sm:text-base font-semibold text-gray-700">
                  🗓️ {bike.year}
                </h2>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Category
                </p>
                <h2 className="text-sm sm:text-base font-semibold text-gray-700">
                  🏍️ {bike.category}
                </h2>
              </div>
            </div>

            {/* SELLER */}
            <div className="mt-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                Owner Details
              </h2>
              <p className="text-gray-700 text-sm">
                👤 {bike.seller?.name || "Verified Seller"}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                📧 {bike.seller?.email}
              </p>
            </div>

            {/* BLOCKED DATES UI LIST */}
            <div className="mt-6 bg-rose-50 p-5 rounded-2xl border border-rose-100">
              <h3 className="font-bold text-rose-700 text-sm sm:text-base mb-3 flex items-center gap-1">
                📅 Booked Slots (Unavailable)
              </h3>
              {bookedDates.length === 0 ? (
                <p className="text-rose-600 text-xs sm:text-sm">
                  Available all days! Ready to glide.
                </p>
              ) : (
                <div className="max-h-24 overflow-y-auto space-y-1 text-xs sm:text-sm text-rose-700">
                  {bookedDates.map((booking) => (
                    <p key={booking._id} className="font-medium">
                      🔒{" "}
                      {new Date(booking.startDate).toLocaleDateString("en-IN")}{" "}
                      - {new Date(booking.endDate).toLocaleDateString("en-IN")}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* DATE INPUTS WRAPPER */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setBookingMessage("");
                  }}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:outline-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setBookingMessage("");
                  }}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:outline-blue-500 text-sm"
                />
              </div>
            </div>

            {/* BOOKING PRICING SUMMARY */}
            {totalDays > 0 && (
              <div className="mt-6 bg-amber-50 border border-amber-100 p-4 rounded-xl flex justify-between items-center text-sm">
                <div>
                  <p className="text-gray-600">Total Duration:</p>
                  <strong className="text-gray-900 text-base">
                    {totalDays} Days
                  </strong>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Estimated Rent:</p>
                  <strong className="text-amber-700 text-xl font-black">
                    ₹{totalPrice}
                  </strong>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                disabled={bookingLoading}
                onClick={() => {
                  setBookingMessage("");
                  if (!validateBooking() || !isDateRangeAvailable()) return;
                  setShowPayment(true);
                }}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-md shadow-blue-200 hover:bg-blue-700 active:scale-95 transition disabled:opacity-50"
              >
                {bookingLoading ? "Processing..." : "Pay & Rent Bike"}
              </button>

              <button
                onClick={handleBuyBike}
                disabled={bike.isSold}
                className={`w-full py-4 rounded-xl font-bold ${
                  bike.isSold
                    ? "bg-red-500 cursor-not-allowed text-white"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {bike.isSold ? "Sold Out" : "Buy Now"}
              </button>
            </div>

            {bookingMessage && (
              <p
                className={`mt-4 text-center text-sm font-semibold p-3 rounded-lg ${
                  bookingSuccess
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {bookingMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {showPayment && (
        <FakePaymentModal
          bike={bike}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </section>
  );
}

export default BikeDetailsPage;
