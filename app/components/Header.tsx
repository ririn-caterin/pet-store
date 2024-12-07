"use client";

import { PawPrint, ShoppingBasket, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const Header = () => {
  const { cart, removeFromCart } = useCart();
  const [isCartVisible, setCartVisible] = useState(false);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  const toggleCart = () => {
    setCartVisible((prev) => !prev);
    console.log(isCartVisible);
  };

  return (
    <header className="flex items-center justify-between px-10 py-5 border-b border-gray-200">
      {/* Logo */}
      <div className="flex items-center">
        <Link
          className="text-xl font-bold flex items-center space-x-1"
          href="/"
        >
          <span className="text-4xl">
            <PawPrint />
          </span>
          <span>Pet Store</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Cart Icon */}
      <button className="relative" onClick={toggleCart}>
        <ShoppingBasket className="text-gray-600 w-8 h-8" />
        <span className="absolute top-[-8px] right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      </button>

      {isCartVisible && (
        <div className="absolute top-[72px] right-0 bottom-0 bg-white shadow-lg border border-gray-200 w-full max-w-[450px]">
          <h2 className="text-lg font-semibold p-4 border-b">
            Items in Your Cart
          </h2>
          {cart.length === 0 ? (
            <p className="p-4 text-gray-500">Your Cart is Empty</p>
          ) : (
            <div>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="p-4 border-b last:border-none">
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <div>
                        <span>
                          {item.quantity} x ${item.price}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-5"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4">
                <Link
                  className="block text-center bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
                  href="/checkout"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
