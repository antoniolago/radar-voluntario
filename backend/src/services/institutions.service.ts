import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";

type SaveCommand = Omit<Prisma.InstitutionCreateManyInput, "id">;

export class InstitutionsService {
  public index = async () => {
    const institutions = await prisma.institution.findMany();

    return institutions;
  }

  public me = async (userId: string) => {
    const institutionsUser = await prisma.institutionUser.findMany({
      where: {
       user_id: userId,
      },
      include: {
        institution: true
      }
    });

    return institutionsUser.map((institutionUser) => institutionUser.institution);
  };

  public save = async (command: SaveCommand, userId: string) => {
    const institution = await prisma.institution.create({
      data: {
        name: command.name,
        latitude: command.latitude,
        longitude: command.longitude,
      },
    });

    await prisma.institutionUser.create({
      data: {
        institution_id: institution.id,
        user_id: userId,
      },
    });

    return institution;
  };
}
