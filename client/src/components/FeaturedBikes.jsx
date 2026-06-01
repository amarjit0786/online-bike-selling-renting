import { useEffect, useState } from "react";
import BikeCard from "./BikeCard";
import { getAllBikes } from "../services/bikeService";

function FeaturedBikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBikes();
  }, []);

  const fetchFeaturedBikes = async () => {
    try {
      const data = await getAllBikes();

      const latestBikes = data.bikes
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setBikes(latestBikes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Bikes</h2>

        {loading ? (
          <div className="text-center text-2xl">Loading Bikes...</div>
        ) : bikes.length === 0 ? (
          <div className="text-center text-2xl">No Bikes Available</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {bikes.map((bike) => (
              <BikeCard key={bike._id} bike={bike} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedBikes;
