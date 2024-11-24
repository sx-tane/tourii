"use client";

import { productsData } from "@/lib/data/marketplace/productData";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import FilterDropdown from "redacted/marketplace/marketplace-component/storefront/FilterBar";
import Pagination from "redacted/marketplace/marketplace-component/storefront/Pagination";
import ProductGrid from "redacted/marketplace/marketplace-component/storefront/ProductGrid";

const Market: NextPage = () => {
	const [allProducts] = useState(productsData); // Original products data
	const [displayedProducts, setDisplayedProducts] = useState(productsData); // Products to display
	const [filter, setFilter] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10; // Adjust this as per your requirement
	const [totalPages, setTotalPages] = useState(
		Math.ceil(productsData.length / itemsPerPage),
	);

	useEffect(() => {
		let filteredProducts = allProducts;

		// Filter logic
		if (filter !== "All") {
			if (filter !== "Experience" && filter !== "Merchandise") {
				filteredProducts = filteredProducts.filter(
					(product) => product.category.bungoOnoArea === filter,
				);
			} else {
				filteredProducts = filteredProducts.filter(
					(product) => product.category.productType === filter,
				);
			}
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
	}, [filter, currentPage, allProducts]);

	return (
		<div>
			<div className="flex h-[90vh] items-center justify-center">
				<div className="m-auto text-3xl font-bold uppercase tracking-widest text-warmGrey3">
					Bonjin Bazaar
				</div>
				<div className="w-3/4">
					<div className="mx-3 flex items-center justify-between">
						<FilterDropdown setFilter={setFilter} />
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							setPage={setCurrentPage}
						/>
					</div>
					<ProductGrid products={displayedProducts} currentPage={currentPage} />
				</div>
			</div>
		</div>
	);
};

export default withPageAuthRequired(Market);
