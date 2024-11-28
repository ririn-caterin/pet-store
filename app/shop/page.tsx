import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ProductSearch from "../components/ProductSearch";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
};

const Page = async ({ searchParams }: { searchParams: { query?: string } }) => {
  const query = searchParams.query || "";

  const res = await fetch(
    `https://buazhyoskrqnozkwtkjp.supabase.co/rest/v1/pet-products?name=ilike.*${query}*`,
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1YXpoeW9za3Jxbm96a3d0a2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0OTg5NzcsImV4cCI6MjA0ODA3NDk3N30.TnvxEibxYpc9hg_TTnOgkwrV_nAkUvxFunilDQ1Czz4",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1YXpoeW9za3Jxbm96a3d0a2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0OTg5NzcsImV4cCI6MjA0ODA3NDk3N30.TnvxEibxYpc9hg_TTnOgkwrV_nAkUvxFunilDQ1Czz4`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const products: Product[] = await res.json();

  return (
    <div>
      <Header />
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-6">Daftar Produk</h1>
        <div className="my-5">
          <ProductSearch />
        </div>
        {products.length > 0 ? (
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
