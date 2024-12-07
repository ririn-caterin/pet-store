"use client";

import Header from "../components/Header";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const Page = () => {
  const { cart, removeFromCart } = useCart();
  const [showModal, setShowModal] = useState(false);

  // Simulasi form data
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    notes: "",
  });

  // Menghitung total item dan total harga
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle perubahan form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle konfirmasi pesanan
  const handleConfirmOrder = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mx-auto py-8">
          <div className="md:w-2/3">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Product List
              </h2>
              <ul>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b py-4"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="text-sm text-gray-600">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 ml-5"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleConfirmOrder}
                className={`w-full py-3 rounded-lg font-semibold ${
                  !formData.fullName.trim() || !formData.address.trim()
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={!formData.fullName.trim() || !formData.address.trim()}
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Order Confirmation</h2>
            <p className="mb-2">
              <strong>Name:</strong> {formData.fullName}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {formData.address}
            </p>
            <p className="mb-2">
              <strong>Notes:</strong> {formData.notes}
            </p>
            <p className="mb-4">
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
