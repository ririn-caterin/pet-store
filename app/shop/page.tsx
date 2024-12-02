"use client";

import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import useSWR from "swr";
import { Search } from "lucide-react";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryFromUrl = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryFromUrl);

  if (!apiKey || !supabaseUrl) {
    throw new Error("Supabase environment variables are missing.");
  }

  const fetcher = (url: string) =>
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
    data: products,
    error,
    isLoading,
  } = useSWR(
    query
      ? `${supabaseUrl}/rest/v1/petshop_products?product_name=ilike.*${query}*`
      : `${supabaseUrl}/rest/v1/petshop_products`,
    fetcher,
    {
      dedupingInterval: 5000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const updateQueryParams = (newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set("query", newQuery);
    } else {
      params.delete("query");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = () => {
    setQuery(searchKeyword);
    updateQueryParams(searchKeyword);
  };

  const handleReset = () => {
    setQuery("");
    setSearchKeyword("");
    updateQueryParams("");
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
            value={searchKeyword}
            placeholder="Search product here..."
            className="border px-4 py-2 w-[300px] rounded-md mr-2"
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <p
              className="text-red-600 cursor-pointer ml-2"
              onClick={handleReset}
            >
              CLEAR
            </p>
          )}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
            onClick={handleSearch}
          >
            <Search className="mr-1" />
            Search
          </button>
        </div>
        {error ? (
          <div>Failed to load</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
