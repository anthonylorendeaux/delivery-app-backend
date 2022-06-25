import {PrismaClient} from "@prisma/client";
import Logger from "../src/utils/logger"

const prisma = new PrismaClient();

const categories = [
    {
        name: "Admin"
    }, 
    {
        name: "Client"
    }, 
    {
        name: "Restaurant"
    },
    {
        name: "Delivery"
    },
    {
        name: "Technical"
    }
]
// seed database
async function main() {
    for (let category of categories) {
        const alreadyExist = await prisma.category.findFirst({
            where: category
    });
        if (!alreadyExist) {
            await prisma.category.create({
                data: category
            });
        }
    }
}

main().catch(e => {
    Logger.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect();
})