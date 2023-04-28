import prisma from "@/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  const { authorId, listingId, userId } = params;
  const query: any = {};
  try {
    if (listingId) query.listingId = listingId;

    if (userId) query.userId = userId;

    if (authorId) query.listing = { userId: authorId };

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((el) => ({
      ...el,
      createdAt: el.createdAt.toISOString(),
      startDate: el.startDate.toISOString(),
      endDate: el.startDate.toISOString(),
      listing: { ...el.listing, createdAt: el.listing.createdAt.toISOString() },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
