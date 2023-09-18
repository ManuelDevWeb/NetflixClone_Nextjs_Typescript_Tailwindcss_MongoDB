import {NextApiRequest, NextApiResponse} from 'next';

// Prisma connection
import prismadb from '@/lib/prismadb'

// Function to check if user is logged in and return user info
import serverAuth from '@/lib/serverAuth';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method !== 'GET'){
        return res.status(405).end();
    }

    try {
        const currentUser = await serverAuth(req, res);      

        // Get user's favorite movies where movie id is in the user's favoriteIds array
        const favoriteMovies=await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser.favoriteIds,
                }
            }
        })

        return res.status(200).json(favoriteMovies);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}