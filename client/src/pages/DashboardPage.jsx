import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import { Link } from "react-router-dom";

function DashboardPage() {

  const { user } = useContext(AuthContext);

  return (
    <section className="min-h-screen bg-gray-100 py-16">

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h1 className="text-5xl font-bold">
            Welcome, {user?.name} 👋
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Manage your bookings and rentals.
          </p>

        </div>


        {/* DASHBOARD CARDS */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {/* BOOKINGS */}
          <Link
            to="/my-bookings"
            className="bg-white p-8 rounded-2xl shadow-lg hover:scale-105 transition"
          >

            <h2 className="text-3xl font-bold">
              📋 My Bookings
            </h2>

            <p className="text-gray-600 mt-4">
              View all your rented bikes.
            </p>

          </Link>



          {/* PROFILE */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">

            <h2 className="text-3xl font-bold">
              👤 Profile
            </h2>

            <p className="text-gray-600 mt-4">
              {user?.email}
            </p>

          </div>



          {/* RENTALS */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">

            <h2 className="text-3xl font-bold">
              🏍️ Rentals
            </h2>

            <p className="text-gray-600 mt-4">
              Manage your bike rentals.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DashboardPage;