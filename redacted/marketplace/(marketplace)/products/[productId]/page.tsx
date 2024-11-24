"use client";

import { ErrorComponent } from "@/app/error";
import Loading from "@/app/loading";
import { NotFoundComponent } from "@/app/not-found";
import Divider from "@/components/about/divider-line/Divider";
import { productsData } from "@/lib/data/marketplace/productData";
import type { Product } from "@/types/interfaceProduct";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import ProductDetails from "@/components/marketplace-component/product/ProductDetails";
import ProductImage from "@/components/marketplace-component/product/ProductImage";
import RelatedProducts from "@/components/marketplace-component/product/RelatedProduct";

type Props = {
	params: {
		productId: string;
	};
};

const ProductPage: NextPage<Props> = withPageAuthRequired(
	async ({ params }) => {
		const [product, setProduct] = useState<Product | null>(null);
		const [isLoading, setIsLoading] = useState(true);
		const [error, setError] = useState<string | null>(null); // State to hold any errors

		useEffect(() => {
			const fetchData = async () => {
				try {
					setIsLoading(true);
					const foundProduct = productsData.find(
						(p) => p.productId === params.productId,
					);
					setProduct(
						foundProduct
							? {
									...foundProduct,
									category: {
										bungoOnoArea:
											foundProduct.category.bungoOnoArea ?? undefined,
										bungoOnoAreaColor:
											foundProduct.category.bungoOnoAreaColor ?? "",
										productType: foundProduct.category.productType ?? undefined,
									},
								}
							: null,
					);
				} catch (e) {
					setError("Failed to fetch product data"); // Set the error state
				} finally {
					setIsLoading(false);
				}
			};

			fetchData().catch((e) => setError(e.message)); // Catch any unhandled errors
		}, [params.productId]);

		if (isLoading) {
			return (
				<div>
					<Loading />
				</div>
			);
		}

		if (error) {
			return (
				<div>
					<ErrorComponent />
				</div>
			);
		}

		if (!product) {
			return (
				<div>
					<NotFoundComponent />
				</div>
			);
		}

		const defaultProduct: Product = {
			productId: product?.productId ?? "",
			name: product?.name ?? "",
			description: product?.description ?? "",
			price: product?.price ?? 0,
			category: {
				bungoOnoArea: product?.category.bungoOnoArea ?? undefined,
				bungoOnoAreaColor: product?.category.bungoOnoAreaColor ?? "",
				productType: product?.category.productType ?? undefined,
			},
			image: product?.image ?? "",
		};

		return (
			<div>
				<div className="mx-auto flex w-11/12 flex-col items-center justify-center transition-all duration-300">
					<div className="flex w-full items-center justify-center">
						<div className="w-1/2 p-24">
							<ProductImage
								image={defaultProduct.image}
								name={defaultProduct.name}
							/>
						</div>
						<div className="w-1/2">
							<ProductDetails product={defaultProduct} />
						</div>
					</div>
					<RelatedProducts
						bungoOnoArea={defaultProduct.category.bungoOnoArea ?? ""}
						productId={defaultProduct.productId}
					/>
					<div className="my-10">
						<Divider />
					</div>
				</div>
			</div>
		);
	},
);

export default ProductPage;
