import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import logoImg from "../assets/logo.png";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="RideHub Logo"
            className="h-10 w-auto object-contain"
          />

          <span className="text-2xl font-bold text-yellow-400">RideHub</span>
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>

          <Link to="/bikes">Bikes</Link>

          {(user?.role === "seller" || user?.role === "admin") && (
            <Link to="/seller">Seller Panel</Link>
          )}
          {user?.role === "admin" && <Link to="/admin">Admin Panel</Link>}
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>

              <span className="text-yellow-400">👋 {user.name}</span>

              <button
                onClick={logout}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
