import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	const requestCartData = await req.json();
	const { product, purchaseData } = requestCartData;
	try {
		let experiencePurchaseId = null;
		let merchandisePurchaseId = null;

		// Create an ExperiencePurchase or MerchandisePurchase based on purchaseData
		if (purchaseData.purchaseType === "Experience" && purchaseData.details) {
			const experiencePurchase = await prisma.experiencePurchase.create({
				data: {
					participants: purchaseData.details.participants,
					date: new Date(purchaseData.details.date), // Ensure date is correctly formatted
					totalPurchase: purchaseData.totalPurchase,
				},
			});
			experiencePurchaseId = experiencePurchase.id;
		} else if (
			purchaseData.purchaseType === "Merchandise" &&
			purchaseData.details
		) {
			const merchandisePurchase = await prisma.merchandisePurchase.create({
				data: {
					itemNumber: purchaseData.details.itemNumber,
					deliveryDate: new Date(purchaseData.details.deliveryDate), // Ensure date is correctly formatted
					totalPurchase: purchaseData.totalPurchase,
				},
			});
			merchandisePurchaseId = merchandisePurchase.id;
		}

		// Add the cart item
		const cartItem = await prisma.cartItem.create({
			data: {
				productId: product.productId.toString(),
				productName: product.productName,
				...(experiencePurchaseId && { experiencePurchaseId }),
				...(merchandisePurchaseId && { merchandisePurchaseId }),
			},
		});
		return Response.json({ cartItem });
	} catch (error) {
		console.error("Failed to add item to cart:", error);
		res.status;
		console.log({ error: "Failed to add item to cart" });
	}
}
