import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createBike } from "../services/sellerBikeService";
import { uploadImage } from "../services/uploadService";
import { useNavigate } from "react-router-dom";

function AddBikePage() {
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

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

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage("");

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

      setFormData((prev) => ({
        ...prev,
        image: data.imageUrl,
      }));
    } catch (error) {
      setMessage("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();

    if (
      !formData.title.trim() ||
      !formData.brand.trim() ||
      !formData.model.trim() ||
      !formData.year ||
      !formData.price ||
      !formData.rentPerDay ||
      !formData.category.trim() ||
      !formData.description.trim()
    ) {
      return setMessage("All fields are required");
    }

    if (!formData.image) {
      return setMessage("Please upload a bike image");
    }

    if (formData.title.trim().length < 3) {
      return setMessage("Title must be at least 3 characters long");
    }

    if (
      Number(formData.year) < 2000 ||
      Number(formData.year) > currentYear + 1
    ) {
      return setMessage(`Year must be between 2000 and ${currentYear + 1}`);
    }

    if (Number(formData.price) <= 0) {
      return setMessage("Price must be greater than 0");
    }

    if (Number(formData.rentPerDay) <= 0) {
      return setMessage("Rent per day must be greater than 0");
    }

    if (formData.description.trim().length < 20) {
      return setMessage("Description should be at least 20 characters");
    }

    try {
      setLoading(true);

      await createBike(
        {
          ...formData,
          title: formData.title.trim(),
          brand: formData.brand.trim(),
          model: formData.model.trim(),
          category: formData.category.trim(),
          description: formData.description.trim(),
        },
        token,
      );

      navigate("/seller/my-bikes");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add bike");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold mb-8">Add Bike</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Title"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="text"
            name="brand"
            value={formData.brand}
            placeholder="Brand"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="text"
            name="model"
            value={formData.model}
            placeholder="Model"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="number"
            name="year"
            value={formData.year}
            placeholder="Year"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="Price"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="number"
            name="rentPerDay"
            value={formData.rentPerDay}
            placeholder="Rent Per Day"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          >
            <option value="">Select Category</option>

            <option value="Sports">Sports</option>

            <option value="Cruiser">Cruiser</option>

            <option value="Electric">Electric</option>

            <option value="Scooter">Scooter</option>
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-4 rounded-lg"
          />

          {uploading && (
            <p className="text-blue-600 font-medium">Uploading Image...</p>
          )}

          {formData.image && (
            <img
              src={formData.image}
              alt="preview"
              className="h-52 rounded-xl object-cover"
            />
          )}

          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
            rows="5"
            className="w-full border p-4 rounded-lg"
          />

          {message && (
            <p className="text-red-500 font-medium text-center">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading || uploading}
            className="bg-yellow-400 px-8 py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding Bike..." : "Add Bike"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddBikePage;
