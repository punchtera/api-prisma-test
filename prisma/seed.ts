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

    const aggregateProgrammingLanguagesDataData = programmingLanguagesData.map((pld) => {
        const profileId = profiles.find((profile) =>
            pld.programmerFirstNames.indexOf(profile.firstName) !== -1)?.id || 0;
        return { name: pld.name, profileId };
    });

    await prisma.socialMedia.createMany({ data: aggregateSocialMediaData });
    await prisma.programmingLanguage.createMany({ data: aggregateProgrammingLanguagesDataData });
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
