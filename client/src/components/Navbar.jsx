import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import logoImg from "../assets/logoB1.png";

function Navbar() {
  const { user, logout, loading } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return null;
  }

  const activeClass =
    "text-yellow-400 font-semibold";

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <img
            src={logoImg}
            alt="RideHub Logo"
            className="h-15 w-auto object-contain"
          />

          <span className="text-2xl font-bold text-yellow-400">
            CityGlide
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex gap-6 items-center">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? activeClass
                : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/bikes"
            className={({ isActive }) =>
              isActive
                ? activeClass
                : ""
            }
          >
            Bikes
          </NavLink>

          {(user?.role === "seller" ||
            user?.role === "admin") && (
            <NavLink
              to="/seller"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : ""
              }
            >
              Seller Panel
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? activeClass
                  : ""
              }
            >
              Admin Panel
            </NavLink>
          )}

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? activeClass
                    : ""
                }
              >
                Dashboard
              </NavLink>

              <span className="text-yellow-400 max-w-40 truncate">
                👋 {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? activeClass
                    : ""
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? activeClass
                    : ""
                }
              >
                Register
              </NavLink>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;