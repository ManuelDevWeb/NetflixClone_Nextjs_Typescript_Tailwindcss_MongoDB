import { PrismaClient } from "@prisma/client";

// This is because next js have hot reload and we don't want to create a new connection every time
const client= global.prismadb || new PrismaClient();

if(process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;