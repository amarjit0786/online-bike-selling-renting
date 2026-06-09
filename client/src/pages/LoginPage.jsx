import { useContext, useState } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Link import kiya naye footer ke liye
import usePageTitle from "../hooks/usePageTitle";



function LoginPage() {
  usePageTitle("CityGlide | Login");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      return setMessage("All fields are required! ⚠️");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setMessage("Please enter a valid email address! ✉️");
    }

    try {
      setLoading(true);
      const data = await loginUser({ email, password });

      login(data.user, data.token);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid email or password. Please try again! ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md">
        
        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100"
        >
          {/* LOGO & HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Ready to glide? Sign in to your CityGlide account.
            </p>
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

          {/* PASSWORD INPUT WITH FIXED POSITIONING */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full border border-gray-200 p-4 pr-14 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-blue-600 transition p-1 select-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-md shadow-blue-100 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 text-sm sm:text-base"
          >
            {loading ? "Verifying Credentials... ⏳" : "Sign In"}
          </button>

          {/* UPGRADED ALERT BOX FOR ERROR MESSAGES */}
          {message && (
            <div className="mt-5 p-4 rounded-xl bg-red-50 border border-red-100 text-center text-sm font-semibold text-red-700 animate-fadeIn">
              {message}
            </div>
          )}
          
          {/* REDIRECT TO REGISTER */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
        
      </div>
    </section>
  );
}

export default LoginPage;