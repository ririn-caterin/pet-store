import { PawPrint, Search } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const menuItems = [
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Shop", path: "/shop" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
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

      {/* Search Icon */}
      <div className="flex items-center">
        <button className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
          <Search />
        </button>
      </div>
    </header>
  );
};

export default Header;
