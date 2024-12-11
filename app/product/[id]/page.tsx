import Header from "../../components/Header";
import Image from "next/image";
import AddToCart from "../../components/AddToCart";
import ProductReview from "@/app/components/ProductReview";

type Params = Promise<{
  id: string;
}>;

const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const revalidate = 86400;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const idProduct = parseInt(id, 10);

  // fetch product detail
  const res = await fetch(`${supabaseUrl}/rest/v1/pet-products?id=eq.${id}`, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
    cache: "force-cache",
  });

  const productDetailArray = await res.json();
  const productDetail = productDetailArray[0];

  return (
    <div>
      <Header />
      <div className="py-10 mx-auto max-w-6xl">
        {res && !res.ok ? (
          <div>Product not found.</div>
        ) : productDetail ? (
          <div className="grid grid-cols-2 gap-10">
            <div>
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
              <AddToCart productDetail={productDetail} />
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <ProductReview productId={idProduct} />
      </div>
    </div>
  );
};

export default Page;
