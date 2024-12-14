"use client";

import {
  PawPrint,
  ShoppingBasket,
  Trash2,
  CircleUserRound,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();
  const [isCartVisible, setCartVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();

  const handleLogout = () => {
    signOut();
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ];

  const toggleCart = () => {
    setCartVisible((prev) => !prev);
  };

  const handleSearch = () => {
    setSearchKeyword(searchKeyword);
    router.push(`/search?q=${searchKeyword}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="px-10 py-5 border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto max-w-6xl">
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

        <div className="flex items-center gap-4">
          {/* Search Product */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search product here..."
              className="border px-4 py-2 w-[300px] rounded-md mr-2"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={handleSearch}
            >
              <Search />
            </button>
          </div>
          {/* User Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownVisible((prev) => !prev)}
              className="flex items-center justify-center"
            >
              <CircleUserRound className="w-8 h-8 text-gray-600 hover:text-black transition" />
            </button>
            {isDropdownVisible && (
              <div className="absolute right-0 mt-1 bg-white shadow-lg p-4 rounded-lg w-60 border border-gray-200 z-10">
                {user ? (
                  <div>
                    <p className="font-semibold text-gray-700 border-b pb-3">
                      Welcome!
                    </p>
                    <div className="flex items-center gap-2 py-4">
                      <Image
                        src={user.user?.image || "/default-avatar.png"}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full border"
                      />
                      <div className="text-sm">
                        <p className=" text-gray-700">{user.user?.name}</p>
                        <p className="text-gray-500">{user.user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full block text-center text-white bg-red-500 hover:bg-red-600 py-1 rounded-lg transition text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold text-gray-700 border-b pb-2">
                      You are not logged in
                    </p>
                    <div className="mt-3">
                      <Link
                        href="/api/auth/signin"
                        className="block text-center text-white bg-blue-500 hover:bg-blue-600 py-1 rounded-lg transition text-sm"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button className="relative" onClick={toggleCart}>
            <ShoppingBasket className="w-8 h-8" />
            <span className="absolute top-[-8px] right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </button>
        </div>

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
      </div>
    </header>
  );
};

export default Header;
