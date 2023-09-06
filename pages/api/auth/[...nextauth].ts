/**
    La estructura pages/api/[...] te permite capturar múltiples segmentos en la URL y 
    utilizarlos como parámetros en tus rutas de API. Esto es especialmente útil cuando 
    necesitas definir rutas de API flexibles que aceptan diferentes cantidades de 
    parámetros o segmentos en la URL.

    Por ejemplo, si tienes un archivo llamado pages/api/[...segments].js, podrías 
    acceder a diferentes rutas de la siguiente manera:

    /api/auth/segmento: El valor de segments será ['segmento'].
    /api/auth/segmento1/segmento2: El valor de segments será ['segmento1', 'segmento2'].
 */

import NextAuth, { RequestInternal } from 'next-auth'

// NextAuth Providers
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

// Prisma adapter
import { PrismaAdapter } from '@next-auth/prisma-adapter'

// Prisma connection
import prismadb from '@/lib/prismadb'

import {compare} from  'bcrypt'

export default NextAuth({
  providers: [
    // OAuth authentication with Github
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    // OAuth authentication with Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      // Credentials to login in the app
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      // Function to verify credentials and return a user
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Find user by email
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email or password are incorrect");
        }

        // Verify password
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Email or password are incorrect");
        }

        return user;
      },
    }),
  ],
  // Page Login
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});