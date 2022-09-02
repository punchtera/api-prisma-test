import profilesData from './data/profiles';
import socialMediaData from './data/socialMedia';
import programmingLanguagesData from './data/programmingLanguages';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

    await prisma.profile.createMany({ data: profilesData });
    const profilesRecords = await prisma.profile.findMany({
        select: {
            firstName: true,
            id: true
        }
    });

    const aggregateSocialMediaData = socialMediaData.map((smd) => {
        const profileId = profilesRecords.find((profile) => profile.firstName === smd.firstName)?.id || 0;
        return { userName: smd.userName, url: smd.url, profileId };
    });

    await prisma.socialMedia.createMany({ data: aggregateSocialMediaData });

    const formatterProgrammingLanguages = programmingLanguagesData.map((pl) => ({ name: pl.name }));
    await prisma.programmingLanguage.createMany({ data: formatterProgrammingLanguages });

    const programmingLanguagesRecords = await prisma.programmingLanguage.findMany();

    for (let index = 0; index < programmingLanguagesData.length; index++) {
        const { programmersFirstName, name } = programmingLanguagesData[index];

        for (let indexj = 0; indexj < programmersFirstName.length; indexj++) {
            const programmerFirstName = programmersFirstName[indexj];
            const profileId = (await prisma.profile
                .findFirst({ where: { firstName: programmerFirstName } }))?.id || 0;
            const programmingLanguageRecord = programmingLanguagesRecords.find((plr) => plr.name === name);
            await prisma.programmingLanguagesOnProfile.create({
                data: {
                    profileId: profileId,
                    programmingLanguageId: programmingLanguageRecord?.id || 0
                }
            });
        }

    }


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
