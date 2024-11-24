// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const requestGoshuinData = await req.json();

//     // Add the goshuin item
//     const updatedGoshuin = await prisma.goshuinReservation.create({
//       data: {
//         goshuinId: requestGoshuinData.goshuinId,
//         goshuinName: requestGoshuinData.goshuinName,
//         name: requestGoshuinData.name,
//         reservationDate: requestGoshuinData.reservationDate,
//         reservationTime: requestGoshuinData.reservationTime,
//         contactNumber: requestGoshuinData.contactNumber,
//         redemptionDate: requestGoshuinData.redemptionDate,
//         email: requestGoshuinData.email,
//         reservationStatus: requestGoshuinData.reservationStatus,
//       },
//     });

//     return new Response(JSON.stringify({ goshuinId: updatedGoshuin.goshuinId }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Failed to add item to cart:', error);
//     return new Response(JSON.stringify({ error: 'Failed to add item to cart' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }
