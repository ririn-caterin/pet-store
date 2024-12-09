"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type ProductDetail = {
  id: number;
  name: string;
  price: number;
};

type AddToCartProps = {
  productDetail: ProductDetail;
};

const AddTocart = ({ productDetail }: AddToCartProps) => {
  const [count, setCount] = useState(1);
  const { addToCart } = useCart();

  // add to cart
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setCount(0);
      return;
    }

    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setCount(numericValue);
    }
  };

  const addToCartHandler = () => {
    if (productDetail) {
      addToCart({
        id: productDetail.id,
        name: productDetail.name,
        quantity: count,
        price: productDetail.price,
      });
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="flex border border-gray-300">
          <button
            className="px-4 py-2 border-r border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
          >
            -
          </button>
          <input
            type="text"
            value={count}
            className="w-12 text-center outline-none"
            onChange={handleChange}
          />
          <button
            className="px-4 py-2 border-l border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => setCount((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        <button
          className="px-6 py-2 bg-orange-500 text-white font-medium  hover:bg-orange-600"
          onClick={addToCartHandler}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default AddTocart;
