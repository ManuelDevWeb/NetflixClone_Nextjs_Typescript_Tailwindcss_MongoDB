import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

// Prisma connection
import prismadb from '@/lib/prismadb'
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Function to check if user is logged in and return user info
const serverAuth=async (req:NextApiRequest, res: NextApiResponse)=>{
    // Get user info from session
    const session = await getServerSession(req,res, authOptions);
    
    if(!session?.user?.email){
        throw new Error('You must be logged in to do this')
    }

    // Get user from database
    const currentUser=await prismadb.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if(!currentUser){
        throw new Error('You must be logged in to do this')
    }

    return currentUser
}

export default serverAuth