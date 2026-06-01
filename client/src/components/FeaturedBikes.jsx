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

      // Latest bikes top par lane ke liye sort aur top 3 slice kiya
      const latestBikes = data.bikes
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setBikes(latestBikes);
    } catch (error) {
      console.log("Error fetching featured bikes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADING STYLE --- */}
        <div className="text-center mb-16">
          
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mt-2 tracking-tight">
            Featured Bikes 🏍️
          </h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* --- MAIN CONDITIONAL RENDERING --- */}
        {loading ? (
          /* Modern Skeleton Loading Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 animate-pulse">
                <div className="bg-gray-200 h-48 w-full rounded-2xl mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : bikes.length === 0 ? (
          /* Premium Empty State UI */
          <div className="max-w-md mx-auto text-center bg-white border border-gray-100 rounded-3xl p-10 shadow-sm">
            <span className="text-5xl block mb-4">🗺️</span>
            <h3 className="text-xl font-bold text-gray-800 mb-1">No Rides Available</h3>
            <p className="text-gray-500 text-sm">
              All bikes are currently glided out. Check back in a few moments!
            </p>
          </div>
        ) : (
          /* Smooth Card Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bikes.map((bike) => (
              <div 
                key={bike._id} 
                className="transform hover:-translate-y-2 transition-all duration-300 ease-out"
              >
                <BikeCard bike={bike} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedBikes;