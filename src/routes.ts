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

    // step necessary to filter the response    
    const viewModelResponse = profileResult.map(profile => {
        return { ...profile, programmingLanguages: profile.programmingLanguages.map(programmingLanguage => programmingLanguage.programmingLanguage) };
    });

    console.log('viewModelResponse', viewModelResponse);

    return res.json({ message: "Helloworld" });
});

export default routes;