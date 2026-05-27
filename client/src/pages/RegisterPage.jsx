import { useState } from "react";

import { registerUser } from "../services/authService";

import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      const data = await registerUser(formData);

      setMessage(data.message);

      navigate("/login");

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Registration failed"
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
          Register
        </h1>


        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          className="w-full border p-4 rounded-lg mb-4"
        />

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
          Register
        </button>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}

      </form>
    </section>
  );
}

export default RegisterPage;