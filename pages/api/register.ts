import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

// Prisma connection
import prismadb from "@/lib/prismadb";

// URL: /api/register
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const {email, name, password} = req.body;

    // Find user by email
    const existingUser= await prismadb.user.findUnique({
        where: {
            email
        }
    })

    if(existingUser){
        return res.status(422).json({error: "User whit email already exists"})
    }

    // Hashing password
    const hashedPassword=await bcrypt.hash(password, 12)

    // Create user and save to database
    const user = await prismadb.user.create({
        data: {
            email,
            name,
            hashedPassword,
            image: '',
            emailVerified: new Date(),
        }
    })

    return res.status(201).json({message: "User created", user})
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
