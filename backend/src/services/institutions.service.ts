import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.InstitutionCreateManyInput, OptionalFields> & {
  address: Omit<
    Prisma.InstitutionAddressCreateManyInput,
    OptionalAddressFields
  >;
};

type OptionalAddressFields = "id" | "institution" | "institution_id";

type AddressSaveCommand = Omit<
  Prisma.InstitutionAddressCreateManyInput,
  OptionalAddressFields
>;

export class InstitutionsService {
  public index = async () => {
    const institutions = await prisma.institution.findMany({
      include: { adresses: true },
    });

    return institutions.map((institution) => ({
      ...institution,
      address: institution.adresses.find((address) => address.primary),
      adresses: undefined,
    }));
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

  public save = async (command: SaveCommand, owner_id: string) => {
    const { address, ...rest } = command;
    console.log(command)
    if (!address) {
      throw new AppError("Address is required", 400);
    }

    const institution = await prisma.institution.create({
      data: {
        ...rest,
        owner_id,
      },
    });

    const institutionAddress = await prisma.institutionAddress.create({
      data: {
        ...address,
        primary: true,
        institution_id: institution.id,
      },
    });

    await prisma.institutionUser.create({
      data: {
        institution_id: institution.id,
        user_id: owner_id,
      },
    });

    return {
      ...institution,
      address: institutionAddress,
    };
  };

  public update = async (id: string, command: SaveCommand) => {
    const { address: _, ...rest } = command;

    const institution = await prisma.institution.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    const address = await prisma.institutionAddress.findFirst({
      where: {
        institution_id: institution.id,
        primary: true,
      },
    });

    if (address) {
      await prisma.institutionAddress.update({
        where: {
          id: address.id,
        },
        data: {
          ...command.address,
        },
      });
    }

    return {
      ...institution,
      address: {
        ...address,
        ...command.address,
      },
    };
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
