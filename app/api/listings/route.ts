import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { debug } from "console";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();
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
  debug;

  return NextResponse.json(listing);
}
