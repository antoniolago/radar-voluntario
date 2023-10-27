import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.InstitutionCreateManyInput, OptionalFields>;

type OptionalAddressFields = "id" | "institution" | "institution_id";

type AddressSaveCommand = Omit<
  Prisma.InstitutionAddressCreateManyInput,
  OptionalAddressFields
>;

export class InstitutionsService {
  public index = async () => {
    const institutions = await prisma.institution.findMany();

    return institutions;
  };

  public me = async (userId: string) => {
    const institutionsUser = await prisma.institutionUser.findMany({
      where: {
        user_id: userId,
      },
      include: {
        institution: true,
      },
    });

    return institutionsUser.map(
      (institutionUser) => institutionUser.institution
    );
  };

  public save = async (command: SaveCommand, userId: string) => {
    const institution = await prisma.institution.create({
      data: {
        ...command,
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

  public getAddresses = async (institutionId: string) => {
    const addresses = await prisma.institutionAddress.findMany({
      where: {
        institution_id: institutionId,
      },
    });

    return addresses;
  };

  public createAddress = async (
    institutionId: string,
    command: AddressSaveCommand
  ) => {
    const institution = await prisma.institution.findUnique({
      where: {
        id: institutionId,
      },
    });

    if (!institution) {
      throw new AppError("Institution not found", 404);
    }

    const address = await prisma.institutionAddress.create({
      data: {
        ...command,
        institution: {
          connect: {
            id: institutionId,
          },
        },
      },
    });

    return address;
  };
}
