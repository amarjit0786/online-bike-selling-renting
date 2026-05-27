import { useEffect, useState } from "react";

import BikeCard from "../components/BikeCard";

import { getAllBikes } from "../services/bikeService";

function BikesPage() {

  const [bikes, setBikes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  useEffect(() => {

    const fetchBikes = async () => {
      try {

        const data = await getAllBikes();

        setBikes(data.bikes);

      } catch (err) {

        setError("Failed to fetch bikes");

      } finally {

        setLoading(false);
      }
    };

    fetchBikes();

  }, []);



  // LOADING
  if (loading) {
    return (
      <div className="text-center text-3xl mt-20 font-bold">
        Loading bikes... ⏳
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

        <h1 className="text-5xl font-bold text-center mb-12">
          Available Bikes
        </h1>


        {/* Bike Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {bikes.length > 0 ? (
            bikes.map((bike) => (
              <BikeCard key={bike._id} bike={bike} />
            ))
          ) : (
            <h2 className="text-2xl text-center col-span-full">
              No Bikes Found
            </h2>
          )}

        </div>
      </div>
    </section>
  );
}

export default BikesPage;