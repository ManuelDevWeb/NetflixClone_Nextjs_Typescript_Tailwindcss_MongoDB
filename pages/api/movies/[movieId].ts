import { NextApiRequest, NextApiResponse } from "next";

// Prisma connection
import prismadb from "@/lib/prismadb";

// Function to check if user is logged in and return user info
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse){    

    try {
        if (req.method !== "GET") {
          return res.status(405).end();
        }

        await serverAuth(req, res);

        // Get movieId from query
        const {movieId} = req.query;
    

        if(typeof movieId !== 'string'){
            throw new Error('Invalid ID')
        }

        // Get movie from database
        const movie=await prismadb.movie.findUnique({
            where:{
                id:movieId
            }
        })

        if(!movie){
            throw new Error('Invalid ID')
        }

        return res.status(200).json(movie)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}