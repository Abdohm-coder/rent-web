import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

import getCurrentUser from "@/actions/getCurrentUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await getCurrentUser({ req, res });

  if (!currentUser) return res.status(401);

  const { listingId } = req.query;

  if (!listingId || typeof listingId !== "string") return res.status(401);

  const listings = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return res.status(200).send(listings);
}
