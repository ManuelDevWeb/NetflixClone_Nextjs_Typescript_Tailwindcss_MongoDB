import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

// Prisma connection
import prismadb from "@/lib/prismadb";

// URL: /api/current
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Get user info from session
    const session = await getSession({ req });

    if (!session?.user?.email) {
      console.log("You must be logged in to do this");
      throw new Error("You must be logged in to do this");
    }

    // Get user from database
    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      throw new Error("You must be logged in to do this");
    }

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
