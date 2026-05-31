import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      return setMessage("All fields are required");
    }

    // Name Validation
    if (name.length < 3) {
      return setMessage("Name must be at least 3 characters long");
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return setMessage("Please enter a valid email address");
    }

    // Password Validation
    if (password.length < 6) {
      return setMessage("Password must be at least 6 characters long");
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name,
        email,
        password,
      });

      setMessage(data.message || "Registration successful");

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Register</h1>

        <input
          type="text"
          name="name"
          value={formData.name}
          maxLength={50}
          placeholder="Enter Name"
          onChange={handleChange}
          className="w-full border p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full border p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full border p-4 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.toLowerCase().includes("successful")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}

export default RegisterPage;
