import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

// Prisma connection
import prismadb from '@/lib/prismadb'

// Function to check if user is logged in and return user info
const serverAuth=async (req:NextApiRequest)=>{
    // Get user info from session
    const session=await getSession({req})

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

    return {
        currentUser
    }
}

export default serverAuth