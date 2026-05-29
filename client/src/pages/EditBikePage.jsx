import { useState, useEffect, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { getBikeById, updateBike } from "../services/sellerBikeService";

import { uploadImage } from "../services/uploadService";

import { AuthContext } from "../context/AuthContext";

function EditBikePage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    rentPerDay: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchBike();
  }, []);

  const fetchBike = async () => {
    try {
      const data = await getBikeById(id);

      setFormData({
        title: data.bike.title,

        brand: data.bike.brand,

        model: data.bike.model,

        year: data.bike.year,

        price: data.bike.price,

        rentPerDay: data.bike.rentPerDay,

        category: data.bike.category,

        description: data.bike.description,

        image: data.bike.image,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const data = await uploadImage(file);

      setFormData({
        ...formData,
        image: data.imageUrl,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBike(id, formData, token);

      alert("Bike Updated Successfully");

      navigate("/seller/my-bikes");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message);
    }
  };

  if (loading) {
    return <h1 className="text-center text-4xl mt-20">Loading...</h1>;
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold mb-8">Edit Bike ✏️</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="rentPerDay"
            value={formData.rentPerDay}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-4 rounded-lg"
          />

          {uploading && <p>Uploading...</p>}

          {formData.image && (
            <img src={formData.image} alt="bike" className="h-52 rounded-xl" />
          )}

          <button className="bg-yellow-400 px-8 py-4 rounded-xl font-bold">
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditBikePage;
