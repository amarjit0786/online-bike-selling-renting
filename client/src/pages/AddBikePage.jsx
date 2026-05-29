import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createBike } from "../services/sellerBikeService";
import { uploadImage } from "../services/uploadService";
import { useNavigate } from "react-router-dom";

function AddBikePage() {
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

  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const { token } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBike(formData, token);

      alert("Bike Added Successfully");

      navigate("/seller/my-bikes");
    } catch (error) {
      alert(error.response?.data?.message);
    }
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

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold mb-8">Add Bike</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="model"
            placeholder="Model"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="year"
            placeholder="Year"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <input
            name="rentPerDay"
            placeholder="Rent Per Day"
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
            <img
              src={formData.image}
              alt="preview"
              className="h-52 rounded-xl"
            />
          )}

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-4 rounded-lg"
          />

          <button className="bg-yellow-400 px-8 py-4 rounded-xl font-bold">
            Add Bike
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddBikePage;
