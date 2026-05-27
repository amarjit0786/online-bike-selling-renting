import { Link } from "react-router-dom";
import logoImg from "../assets/logo1.png";

function Navbar() {
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

        {/* Menu */}
        <div className="flex gap-6 text-lg">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link to="/bikes" className="hover:text-yellow-400 transition">
            Bikes
          </Link>

          <Link to="/rent" className="hover:text-yellow-400 transition">
            Rent
          </Link>

          <Link to="/login" className="hover:text-yellow-400 transition">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;