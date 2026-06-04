import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const districts = [
  "Warangal",
  "Jangaon",
  "Ghanpur",
  "Hanamkonda",
  "Mahabubabad",
  "Mulugu",
];

export default function DealerRegister() {
  const [formData, setFormData] = useState({
    businessName: "",
    phoneNumber: "",
    district: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "phoneNumber" ? value.replace(/\D/g, "").slice(0, 10) : value,
    });
  };

  const isBusinessValid = formData.businessName.trim().length >= 5;
  const isPhoneValid = /^\d{10}$/.test(formData.phoneNumber);
  const isDistrictValid = districts.includes(formData.district);

  const isFormValid = isBusinessValid && isPhoneValid && isDistrictValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/dealers/register",
        formData
      );

      toast.success(`Dealer registered! ID: ${response.data.id}`);

      setFormData({
        businessName: "",
        phoneNumber: "",
        district: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-4">Dealer Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter business name"
            required
          />
          {formData.businessName && !isBusinessValid && (
            <p className="text-red-500 text-sm">Minimum 5 characters required</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="9876543210"
            inputMode="numeric"
            maxLength={10}
            required
          />
          {formData.phoneNumber && !isPhoneValid && (
            <p className="text-red-500 text-sm">Enter exactly 10 digits</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Service District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="w-full bg-green-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register Dealer"}
        </button>
      </form>
    </div>
    </div>
  );
}