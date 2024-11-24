import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
	const requestGoshuinData = await req.json();
	console.log(requestGoshuinData);

	try {
		// Add the goshuin item
		const upodatedGoshuin = await prisma.goshuinReservation.create({
			data: {
				goshuinId: requestGoshuinData.goshuinId,
				goshuinName: requestGoshuinData.goshuinName,
				name: requestGoshuinData.name,
				reservationDate: requestGoshuinData.reservationDate,
				reservationTime: requestGoshuinData.reservationTime,
				contactNumber: requestGoshuinData.contactNumber,
				redemptionDate: requestGoshuinData.redemptionDate,
				email: requestGoshuinData.email,
				reservationStatus: requestGoshuinData.reservationStatus,
			},
		});

		return Response.json({ goshuinId: upodatedGoshuin.goshuinId });
	} catch (error) {
		console.error("Failed to add item to cart:", error);
	}
}
