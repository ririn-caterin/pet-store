import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
};

const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const Page = async () => {
  const res = await fetch(`${supabaseUrl}/rest/v1/pet-products`, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
  });
  const data = await res.json();
  const products = data;

  if (!apiKey || !supabaseUrl) {
    throw new Error("Supabase environment variables are missing.");
  }

  return (
    <div>
      <Header />
      <div className="py-10 mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold mb-6">Daftar Produk</h1>
        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
