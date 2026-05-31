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

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

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
      setMessage("Failed to load bike");
    } finally {
      setLoading(false);
    }
  };

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
      return setMessage("Bike image is required");
    }

    if (formData.title.trim().length < 3) {
      return setMessage("Title must be at least 3 characters");
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
      return setMessage("Description must be at least 20 characters");
    }

    try {
      setSaving(true);

      await updateBike(
        id,
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
      setMessage(error.response?.data?.message || "Failed to update bike");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <h1 className="text-center text-4xl mt-20">Loading...</h1>;
  }

  return (
    <section className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold mb-8">Edit Bike ✏️</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Model"
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="number"
            name="rentPerDay"
            value={formData.rentPerDay}
            onChange={handleChange}
            placeholder="Rent Per Day"
            className="w-full border p-4 rounded-lg"
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-4 rounded-lg"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Description"
            className="w-full border p-4 rounded-lg"
          />

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
              alt="bike"
              className="h-52 rounded-xl object-cover"
            />
          )}

          {message && (
            <p className="text-red-500 font-medium text-center">{message}</p>
          )}

          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-yellow-400 px-8 py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default EditBikePage;
