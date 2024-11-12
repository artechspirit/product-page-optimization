"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    };

    const fetchCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/category-list");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
    fetchProducts();
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    categoryFilter === "All"
      ? products
      : products.filter((product) => product.category === categoryFilter);

  // Sort products based on price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    }
    return b.price - a.price;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
      <div className="flex justify-between mb-4">
        <div>
          <label htmlFor="category" className="mr-2">
            Filter by Category:
          </label>
          <select
            id="category"
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
            className="border p-2"
          >
            <option value="All">All</option>
            {categories.map((cat, id) => (
              <option key={id} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by Price:
          </label>
          <select
            id="sort"
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="border p-2"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <Image
                priority
                src={product.thumbnail}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-96 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p>{product.description}</p>
              <p className="text-lg font-bold">${product.price}</p>
              <Link
                href={`/product/${product.id}`}
                className="text-blue-500 mt-4 block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
