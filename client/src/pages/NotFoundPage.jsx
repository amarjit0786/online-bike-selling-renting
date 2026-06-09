import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center">

        <h1 className="text-8xl md:text-9xl font-black text-yellow-400">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          Looks like this road doesn't exist in CityGlide.
          Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition"
        >
          🏍️ Back To Home
        </Link>

      </div>
    </div>
  );
}

export default NotFoundPage;