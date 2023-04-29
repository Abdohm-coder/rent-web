import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await getCurrentUser({ req, res });

  if (!currentUser) return res.status(401);

  const body = req.body;
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice)
    return NextResponse.error();

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });
  return res.status(200).send(listingAndReservation);
}
