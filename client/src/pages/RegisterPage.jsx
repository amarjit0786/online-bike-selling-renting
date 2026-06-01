import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link add kiya login page redirect ke liye
import { registerUser } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;

    // Required Fields
    if (!name || !email || !password) {
      return setMessage("All fields are required! ⚠️");
    }

    // Name Validation
    if (name.length < 3) {
      return setMessage("Name must be at least 3 characters long! 👤");
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setMessage("Please enter a valid email address! ✉️");
    }

    // Password Validation
    if (password.length < 6) {
      return setMessage("Password must be at least 6 characters long! 🔒");
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name,
        email,
        password,
      });

      setMessage(data.message || "Registration successful! 🎉");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed. Please try again! ❌");
    } finally {
      setLoading(false);
    }
  };

  // Helper variable message status color dynamic karne ke liye
  const isSuccess = message.toLowerCase().includes("successful");

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        
        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100"
        >
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Join CityGlide today and find your perfect ride.
            </p>
          </div>

          {/* NAME INPUT */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              maxLength={50}
              placeholder="John Doe"
              onChange={handleChange}
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-800"
            />
          </div>

          {/* EMAIL INPUT */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="name@example.com"
              onChange={handleChange}
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-800"
            />
          </div>

          {/* PASSWORD INPUT */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-800"
            />
          </div>

          {/* REGISTER BUTTON (CityGlide Blue Theme) */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-md shadow-blue-100 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-sm sm:text-base"
          >
            {loading ? "Creating Account... ⏳" : "Register"}
          </button>

          {/* PREMIUM ALERT DIALOG */}
          {message && (
            <div
              className={`mt-5 p-4 rounded-xl border text-center text-sm font-semibold animate-fadeIn ${
                isSuccess
                  ? "bg-green-50 border-green-100 text-green-700"
                  : "bg-red-50 border-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          {/* FOOTER LINK */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </form>

      </div>
    </section>
  );
}

export default RegisterPage;