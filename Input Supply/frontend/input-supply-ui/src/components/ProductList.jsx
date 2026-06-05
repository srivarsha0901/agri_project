import React, { useState } from "react";

export default function ProductList() {
  const [loading] = useState(false);
  const [products] = useState([]);

  const itemsPerPage = 20;
  const currentPage = 1;

  const totalProducts = products.length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          Product List
        </h1>

        <div className="bg-white shadow rounded-lg p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No products yet
          </h2>

          <p className="text-gray-500 mt-2">
            Products will appear here once they are added.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Product List
      </h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p>Showing 0-0 of 0</p>

        <div>
          <button
            disabled
            className="px-4 py-2 border rounded mr-2 opacity-50"
          >
            Previous
          </button>

          <button
            disabled
            className="px-4 py-2 border rounded opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}