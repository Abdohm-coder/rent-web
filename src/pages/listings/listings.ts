import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

import getCurrentUser from "@/actions/getCurrentUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await getCurrentUser({ req, res });

  if (!currentUser) return res.status(401);

  const body: any = req.body;
  const {
    title,
    description,
    imageSrc,
    category,
    location,
    price,
    roomCount,
    guestCount,
    bathroomCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      roomCount,
      bathroomCount,
      category,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return res.status(200).send(listing);
}
