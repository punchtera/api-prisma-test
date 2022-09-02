import profilesData from './data/profiles';
import socialMediaData from './data/socialMedia';
import programmingLanguagesData from './data/programmingLanguages';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    await prisma.profile.createMany({ data: profilesData });
    const profiles = await prisma.profile.findMany({
        select: {
            firstName: true,
            id: true
        }
    });

    const aggregateSocialMediaData = socialMediaData.map((smd) => {
        const profileId = profiles.find((profile) => profile.firstName === smd.firstName)?.id || 0;
        return { userName: smd.userName, url: smd.url, profileId };
    });

    await prisma.socialMedia.createMany({ data: aggregateSocialMediaData });

    const formatterProgrammingLanguages = programmingLanguagesData.map((pl) => ({ name: pl.name }));
    await prisma.programmingLanguage.createMany({ data: formatterProgrammingLanguages });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
