import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const routes = Router();

routes.get('/', async (_req, res) => {
    const profileResult =
        await prisma.profile.findMany({
            include: {
                programmingLanguages: {
                    include: { programmingLanguage: true }
                }
            }
        });

    console.log('profileResult', profileResult);
    console.log('profileResult[0].programmingLanguages', profileResult[0].programmingLanguages);
    // console.log(JSON.stringify(profileResult));
    return res.json({ message: "Helloworld" });
});

export default routes;