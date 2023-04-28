import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

interface getSessionProps {
  res: NextApiResponse;
  req: NextApiRequest;
}

export async function getSession(route: getSessionProps | undefined) {
  return route
    ? await getServerSession(route.req, route.res, authOptions)
    : await getServerSession(authOptions);
}

export default async function getCurrentUser(
  route?: getSessionProps | undefined
) {
  try {
    const session = await getSession(route);
    console.log("session is: ", session);

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) return null;

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
