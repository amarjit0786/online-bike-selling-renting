import { Link } from "react-router-dom";

function BikeCard({ bike }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      {bike.isSold && (
        <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          🔴 SOLD
        </div>
      )}
      <div className="relative">
        <img
          src={bike.image}
          alt={bike.title}
          className={`h-56 w-full object-cover transition ${
            bike.isSold ? "opacity-60" : ""
          }`}
        />

        {bike.isSold && <div className="absolute inset-0 bg-black/20"></div>}
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold">{bike.title}</h2>

        <p className="text-gray-500 mt-2">{bike.brand}</p>

        <p className="text-gray-600 mt-2">₹{bike.rentPerDay}/day Rent</p>

        <div className="mt-4 flex justify-between items-center">
          <span
            className={`font-bold text-xl ${
              bike.isSold ? "text-red-500" : "text-yellow-500"
            }`}
          >
            ₹{bike.price}
          </span>

          <Link
            to={`/bikes/${bike._id}`}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BikeCard;
