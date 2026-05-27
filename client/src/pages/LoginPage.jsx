import { useContext, useState } from "react";

import { loginUser } from "../services/authService";

import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = await loginUser(formData);

      login(data.user, data.token);

      navigate("/");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };



  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
      >

        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>


        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full border p-4 rounded-lg mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full border p-4 rounded-lg mb-4"
        />

        <button className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800">
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-red-500">
            {message}
          </p>
        )}

      </form>
    </section>
  );
}

export default LoginPage;