import { useContext, useEffect, useState } from "react";

import { getAllBikes, deleteBike } from "../services/adminService";

import { AuthContext } from "../context/AuthContext";
import AdminLayout from "../components/admin/AdminLayout";

function AdminBikesPage() {
  const { token } = useContext(AuthContext);

  const [bikes, setBikes] = useState([]);

  const fetchBikes = async () => {
    const data = await getAllBikes(token);

    setBikes(data.bikes);
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure?");

    if (!confirmed) return;

    await deleteBike(id, token);

    fetchBikes();
  };

  return (
    <AdminLayout>
      <section className="min-h-screen bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-10">Bikes 🏍️</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {bikes.map((bike) => (
              <div
                key={bike._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={bike.image}
                  alt={bike.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-2xl font-bold">{bike.title}</h2>

                  <p>₹{bike.price}</p>

                  <p className="text-sm text-gray-500 mt-2">
                    Seller: {bike.seller?.name}
                  </p>

                  <button
                    onClick={() => handleDelete(bike._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
                  >
                    Delete Bike
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default AdminBikesPage;
