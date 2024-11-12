import Image from "next/image";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
};

// Fetch product data based on ID
const fetchProductData = async (id: string): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();

  return data;
};

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProductData(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex">
        {/* Left side - Image carousel */}
        <div className="w-1/2">
          <Image
            src={product.images[0]}
            alt={product.title}
            priority
            width={500}
            height={500}
            className="w-full h-96 object-cover mb-4"
          />
          <div className="flex space-x-4">
            {product.images.map((image, idx) => (
              <Image
                priority
                key={idx}
                src={image}
                alt={`Image ${idx + 1}`}
                width={100}
                height={100}
                className="w-24 h-24 object-cover cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="w-1/2 ml-8">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-lg mt-2">{product.description}</p>
          <p className="text-xl font-bold mt-4">
            ${product.price}{" "}
            <span className="line-through text-gray-500">
              -${product.discountPercentage}%
            </span>
          </p>
          <p className="text-sm text-gray-600">Rating: {product.rating} / 5</p>
          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
          <p
            className={`mt-2 text-white px-4 py-2 rounded-full ${
              product.availabilityStatus === "In Stock"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {product.availabilityStatus}
          </p>

          {/* Additional Information */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Details</h3>
            <ul className="list-none">
              <li>
                <strong>SKU:</strong> {product.sku}
              </li>
              <li>
                <strong>Weight:</strong> {product.weight}kg
              </li>
              <li>
                <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
                {product.dimensions.height} x {product.dimensions.depth} cm
              </li>
              <li>
                <strong>Warranty:</strong> {product.warrantyInformation}
              </li>
              <li>
                <strong>Shipping:</strong> {product.shippingInformation}
              </li>
              <li>
                <strong>Return Policy:</strong> {product.returnPolicy}
              </li>
              <li>
                <strong>Minimum Order Quantity:</strong>{" "}
                {product.minimumOrderQuantity}
              </li>
            </ul>
          </div>

          {/* QR Code */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Product QR Code</h3>
            <Image
              src={product.meta.qrCode}
              alt="QR Code"
              width={100}
              height={100}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        <div className="space-y-4 mt-4">
          {product.reviews.map((review, idx) => (
            <div key={idx} className="border p-4 rounded-lg">
              <p>
                <strong>{review.reviewerName}</strong> ({review.reviewerEmail})
              </p>
              <p>Rating: {review.rating} / 5</p>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
