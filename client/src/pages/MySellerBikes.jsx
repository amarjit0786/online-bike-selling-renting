import { useContext, useEffect, useState } from "react";

import { getMyBikes, deleteBike } from "../services/sellerBikeService";

import { AuthContext } from "../context/AuthContext";

function MySellerBikes() {
  const { token } = useContext(AuthContext);

  const [bikes, setBikes] = useState([]);

  const fetchBikes = async () => {
    try {
      const data = await getMyBikes(token);

      setBikes(data.bikes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBike(id, token);

      fetchBikes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">My Bikes 🏍️</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {bikes.map((bike) => (
            <div
              key={bike._id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={bike.image}
                alt={bike.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-bold">{bike.title}</h2>

                <p>₹{bike.price}</p>

                <div className="flex gap-3 mt-5">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(bike._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MySellerBikes;
