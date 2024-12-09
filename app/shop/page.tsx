"use client";

import { useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import { Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
};

const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const Page = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  if (!apiKey || !supabaseUrl) {
    throw new Error("Supabase environment variables are missing.");
  }

  const fetcher = (url: string | URL | Request) =>
    fetch(url, {
      method: "GET",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      return res.json();
    });

  const {
    data: products = [],
    error,
    isLoading,
    mutate,
  } = useSWR(
    query
      ? `${supabaseUrl}/rest/v1/pet-products?name=ilike.*${query}*`
      : `${supabaseUrl}/rest/v1/pet-products`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleSearch = () => {
    mutate(
      fetcher(
        `${supabaseUrl}/rest/v1/pet-products?name=ilike.*${searchKeyword}*`
      ),
      { revalidate: false }
    );
    router.replace(`?query=${searchKeyword}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-6">Daftar Produk</h1>
        <div className="my-5 flex items-center">
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
        {error ? (
          <div>failed to load</div>
        ) : isLoading ? (
          <div>loading...</div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>Tidak ada produk tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
