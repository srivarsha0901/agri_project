import React, { useState } from "react";
import toast from "react-hot-toast";

function ProductUpload() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    brand: "",
    packSize: "",
    price: "",
    stock: "",
  });

  const [products, setProducts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const { name, type, brand, packSize, price, stock } = formData;

    if (!name || !type || !brand || !packSize || !price || stock === "") {
      return "All fields are required";
    }

    if (Number(price) <= 0) {
      return "Selling Price must be greater than 0";
    }

    if (Number(stock) < 0) {
      return "Stock Quantity cannot be negative";
    }

    return null;
  };

  const isFormValid =
    formData.name &&
    formData.type &&
    formData.brand &&
    formData.packSize &&
    Number(formData.price) > 0 &&
    Number(formData.stock) >= 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      toast.error(error);
      return;
    }

    const newProduct = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    setProducts((prev) => [...prev, newProduct]);

    toast.success("Product added successfully!");

    setFormData({
      name: "",
      type: "",
      brand: "",
      packSize: "",
      price: "",
      stock: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          Product Upload
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border rounded-lg p-3"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Type</option>
            <option value="fertilizer">Fertilizer</option>
            <option value="seed">Seed</option>
            <option value="pesticide">Pesticide</option>
          </select>

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="packSize"
            value={formData.packSize}
            onChange={handleChange}
            placeholder="Pack Size (50kg, 1L)"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Selling Price"
            min="1"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            min="0"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full bg-green-600 text-white py-3 rounded-lg disabled:opacity-50"
          >
            Upload Product
          </button>
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Products List</h2>

        {products.length === 0 ? (
          <p>No products added yet</p>
        ) : (
          products.map((product, index) => (
            <div key={index} className="border rounded-lg p-4 mb-3">
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Type:</strong> {product.type}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Pack Size:</strong> {product.packSize}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductUpload;