import { Link } from "react-router-dom";

function BikeCard({ bike }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      <img
        src={bike.image}
        alt={bike.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold">{bike.title}</h2>

        <p className="text-gray-500 mt-2">{bike.brand}</p>

        <p className="text-gray-600 mt-2">₹{bike.rentPerDay}/day Rent</p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-yellow-500 font-bold text-xl">
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
