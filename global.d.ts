import {PrismaClient} from '@prisma/client'

// Global file are not affected by hot reload, so we can use it to store the connection
declare global {
    namespace globalThis{
        var prismadb: PrismaClient;
    }
}