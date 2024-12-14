"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

const Page = () => {
  const searchParams = useSearchParams();
  const key = searchParams.get("q") || "";

  console.log(key);
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(
    `${supabaseUrl}/rest/v1/pet-products?name=ilike.*${key}*`,
    fetcher
  );

  return (
    <div>
      <Header />
      <div className="py-10 mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">Hasil Pencarian: {key}</h1>
        <div>
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
    </div>
  );
};

export default Page;
