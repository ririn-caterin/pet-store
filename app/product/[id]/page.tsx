"use client";

import Header from "../../components/Header";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }

  return res.json();
};

const Page = () => {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const { addToCart } = useCart();

  const { data, error, isLoading } = useSWR(
    `${supabaseUrl}/rest/v1/pet-products?id=eq.${id}`,
    fetcher
  );

  const productDetail = data ? data[0] : null;

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
      console.log(`Added ${count} of ${productDetail.name} to the cart.`);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-10">
        {error ? (
          <div>failed to load</div>
        ) : isLoading ? (
          <div>loading...</div>
        ) : (
          <div className="grid grid-cols-2 gap-10">
            <div className="">
              <Image
                src={productDetail.image_url}
                alt={productDetail.name}
                className="w-full"
                width={300}
                height={300}
              />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">{productDetail.name}</h1>
              <div className="flex items-center my-3">
                <p className="text-xl font-bold text-gray-900 mr-5">
                  ${productDetail.price}
                </p>
                <p className="text-gray-500">{productDetail.description}</p>
              </div>
              <p className="mb-10">{productDetail.product_detail}</p>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
