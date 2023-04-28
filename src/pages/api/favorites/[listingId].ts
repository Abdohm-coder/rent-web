import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await getCurrentUser({ req, res });
  
  if (!currentUser) return res.status(401);

  const { listingId } = req.query;

  if (!listingId || typeof listingId !== "string") return res.status(401);

  if (req.method === "POST") {
    let favouriteIds = [...(currentUser.favouriteIds || [])];

    favouriteIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: { favouriteIds },
    });

    return res.status(200).send(user);
  }

  if (req.method === "DELETE") {
    let favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds = favouriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: { favouriteIds },
    });

    return res.status(200).send(user);
  }
}
