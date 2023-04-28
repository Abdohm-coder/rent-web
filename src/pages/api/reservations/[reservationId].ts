import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

import getCurrentUser from "@/actions/getCurrentUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentUser = await getCurrentUser({ req, res });

  if (!currentUser) return res.status(401);

  const { reservationId } = req.query;

  if (!reservationId || typeof reservationId !== "string")
    return res.status(401);

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        {
          listing: { userId: currentUser.id },
        },
      ],
    },
  });

  return res.status(200).send(reservation);
}
