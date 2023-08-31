/**
    La estructura pages/api/[...] te permite capturar múltiples segmentos en la URL y 
    utilizarlos como parámetros en tus rutas de API. Esto es especialmente útil cuando 
    necesitas definir rutas de API flexibles que aceptan diferentes cantidades de 
    parámetros o segmentos en la URL.

    Por ejemplo, si tienes un archivo llamado pages/api/[...segments].js, podrías 
    acceder a diferentes rutas de la siguiente manera:

    /api/segmento: El valor de segments será ['segmento'].
    /api/segmento1/segmento2: El valor de segments será ['segmento1', 'segmento2'].
 */

import NextAuth, { RequestInternal } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import prismadb from '@/lib/prismadb'

import {compare} from  'bcrypt'

export default NextAuth({
  providers: [
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
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});