import { useState } from "react";

export default function DealerPage() {
  const [dealer, setDealer] = useState({
    businessName: "",
    phoneNumber: "",
    totalProducts: 0,
    joinDate: "",
  });

  const [showModal, setShowModal] = useState(false);

  const [editData, setEditData] = useState({
    businessName: "",
    phoneNumber: "",
  });

  const handleOpenModal = () => {
    setEditData({
      businessName: dealer.businessName,
      phoneNumber: dealer.phoneNumber,
    });

    setShowModal(true);
  };

  const handleUpdate = () => {
    setDealer({
      ...dealer,
      businessName: editData.businessName,
      phoneNumber: editData.phoneNumber,
    });

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-green-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Dealer Dashboard
          </h1>

          <ul className="flex gap-6">
            <li className="cursor-pointer hover:text-green-200">
              Dashboard
            </li>
            <li className="cursor-pointer hover:text-green-200">
              Products
            </li>
            <li className="cursor-pointer hover:text-green-200">
              Orders
            </li>
          </ul>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-6">
        {/* Dealer Profile */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Dealer Profile
            </h2>

            <button
              onClick={handleOpenModal}
              className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Business Name
              </p>
              <p className="font-semibold">
                {dealer.businessName || "Not Available"}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Phone Number
              </p>
              <p className="font-semibold">
                {dealer.phoneNumber || "Not Available"}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Total Products Listed
              </p>
              <p className="font-semibold">
                {dealer.totalProducts}
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <p className="text-gray-500 text-sm">
                Join Date
              </p>
              <p className="font-semibold">
                {dealer.joinDate || "Not Available"}
              </p>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">
            Products
          </h2>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              0 products
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Edit Profile
            </h2>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Business Name
              </label>

              <input
                type="text"
                value={editData.businessName}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    businessName: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Enter business name"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                value={editData.phoneNumber}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    phoneNumber: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg p-3"
                placeholder="Enter phone number"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}