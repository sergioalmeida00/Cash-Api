import { PrismaClient } from "@prisma/client";

const prismaDb = new PrismaClient({
    log:['query']
});

export {prismaDb}