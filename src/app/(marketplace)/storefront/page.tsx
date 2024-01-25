"use client";

import FilterBar from "@/components/marketplace/storefront/FilterBar";
import Pagination from "@/components/marketplace/storefront/Pagination";
import ProductGrid from "@/components/marketplace/storefront/ProductGrid";
import SearchBar from "@/components/marketplace/storefront/SearchBar";
import { productsData } from "@/lib/data/marketplace/productData";
import { type NextPage } from "next";
import { useState, useEffect } from "react";

const Market: NextPage = () => {
  const [allProducts] = useState(productsData); // Original products data
  const [displayedProducts, setDisplayedProducts] = useState(productsData); // Products to display
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust this as per your requirement
  const [totalPages, setTotalPages] = useState(
    Math.ceil(productsData.length / itemsPerPage),
  );

  useEffect(() => {
    let filteredProducts = allProducts;

    // Filter logic
    if (filter !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category.productType === filter,
      );
    }

    // Reset to first page when filter changes
    const newTotalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    setTotalPages(newTotalPages);
    if (currentPage > newTotalPages) {
      setCurrentPage(1);
    }

    // Pagination logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage,
    );

    setDisplayedProducts(paginatedProducts);
  }, [filter, currentPage, allProducts]); // Ensure dependencies are correctly listed

  return (
    <div className="m-10 transition-all duration-300">
      <div className="flex justify-between">
        <FilterBar setFilter={setFilter} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setCurrentPage}
        />
      </div>

      <ProductGrid products={displayedProducts} currentPage={currentPage} />
    </div>
  );
};

export default Market;
