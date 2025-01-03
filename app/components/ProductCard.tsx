import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover"
          width={200}
          height={200}
        />
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-gray-900 mt-2">
            ${product.price}
          </p>
          <Link
            href={`/product/${product.id}`}
            className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-brown-600 transition"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
