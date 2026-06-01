import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicStats } from "../services/statsService";

function Hero() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBikes: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getPublicStats();

      setStats({
        totalUsers: data.totalUsers || 0,
        totalBikes: data.totalBikes || 0,
        totalBookings: data.totalBookings || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* LEFT */}
        <div>
          <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold text-sm">
            🚀 Trusted Bike Marketplace
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mt-6">
            Buy, Sell & Rent
            <span className="text-yellow-400"> Dream Bikes</span>
          </h1>

          <p className="text-gray-300 mt-6 text-lg leading-relaxed max-w-xl">
            Discover premium motorcycles from trusted sellers. Rent bikes for
            adventures or sell your ride effortlessly.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/bikes"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Explore Bikes
            </Link>

            <Link
              to="/seller/add-bike"
              className="border border-yellow-400 px-6 py-3 rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              Start Selling
            </Link>
          </div>

          {/* LIVE STATS */}
          <div className="mt-12 flex gap-10 flex-wrap">
            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                {stats.totalBikes}+
              </h3>
              <p className="text-gray-400">Bikes Listed</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                {stats.totalUsers}+
              </h3>
              <p className="text-gray-400">Registered Users</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-yellow-400">
                {stats.totalBookings}+
              </h3>
              <p className="text-gray-400">Successful Bookings</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="absolute -inset-4 bg-yellow-400/20 blur-2xl rounded-3xl"></div>

          <img
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39"
            alt="bike"
            className="relative rounded-3xl shadow-2xl border border-yellow-400/20 hover:scale-105 transition duration-500"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
