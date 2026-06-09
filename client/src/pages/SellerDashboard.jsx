import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";


function SellerDashboard() {
  usePageTitle("CityGlide | Seller Dashboard");
  return (
    <section className="min-h-screen bg-gray-100 py-16">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-5xl font-bold mb-10">
          Seller Dashboard 🏍️
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          <Link
            to="/seller/add-bike"
            className="bg-white p-10 rounded-3xl shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-3xl font-bold">
              ➕ Add New Bike
            </h2>

            <p className="mt-4 text-gray-600">
              Upload bikes for rent & sale.
            </p>
          </Link>

          <Link
            to="/seller/my-bikes"
            className="bg-white p-10 rounded-3xl shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-3xl font-bold">
              🏍️ Manage Bikes
            </h2>

            <p className="mt-4 text-gray-600">
              Edit and delete listings.
            </p>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default SellerDashboard;