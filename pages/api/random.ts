import { NextApiRequest, NextApiResponse } from "next";

// Prisma connection
import prismadb from "@/lib/prismadb";

// Function to check if user is logged in and return user info
import serverAuth from "@/lib/serverAuth";

// URL: /api/random
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    // Function to check if user is logged in and return user info
    await serverAuth(req);

    // Get number of movies in database
    const movieCount=await prismadb.movie.count();
    // Generate random index
    const randomIndex=Math.floor(Math.random()*movieCount);

    // Get random movie
    const randomMovie=await prismadb.movie.findMany({
        take: 1,
        skip: randomIndex
    })

    return res.status(200).json(randomMovie[0])
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
