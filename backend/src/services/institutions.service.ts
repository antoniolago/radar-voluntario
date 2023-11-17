import { InstitutionAddress, Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.InstitutionCreateManyInput, OptionalFields> & {
  address: Omit<
    Prisma.InstitutionAddressCreateManyInput,
    "institution" | "institution_id"
  >;
};

type UpdateCommand = Omit<SaveCommand, "address"> & {
  address: Omit<
    Prisma.InstitutionAddressCreateManyInput,
    "institution" | "institution_id"
  >;
};

type OptionalAddressFields = "id" | "institution" | "institution_id";

type AddressSaveCommand = Omit<
  Prisma.InstitutionAddressCreateManyInput,
  OptionalAddressFields
>;

export class InstitutionsService {
  public show = async (id: string) => {
    const institution = await prisma.institution.findUnique({
      where: {
        id,
      },
      include: {
        adresses: true,
      },
    });

    if (!institution) {
      throw new AppError("Institution not found", 404);
    }

    return {
      ...institution,
      address: institution.adresses.find((address) => address.primary),
      adresses: undefined,
    };
  };

  public index = async () => {
    const institutions = await prisma.institution.findMany({
      include: { adresses: true,
        opportunities: {
          select : {
            id: true
          }
        },
      },
      orderBy: {
        name: "asc",
      },
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
        institution: {
          include: {
            opportunities: {
              select : {
                id: true
              }
            },
          }
        },
      },
      orderBy: {
        institution: {
          name: "asc",
        },
      },
    });

    return institutionsUser.map(
      (institutionUser) => institutionUser.institution
    );
  };

  public save = async (command: SaveCommand, owner_id: string) => {
    const { address, ...rest } = command;

    const institution = await prisma.institution.create({
      data: {
        ...rest,
        owner_id,
      },
    });

    let institutionAddress: InstitutionAddress | null = null;

    if (address !== undefined) {
      if (address.id) {
        institutionAddress = await prisma.institutionAddress.update({
          where: {
            id: address.id,
          },
          data: {
            ...address,
          },
        });
      } else {
        const primaryAddress = await prisma.institutionAddress.findFirst({
          where: {
            institution_id: institution.id,
            primary: true,
          },
        });

        institutionAddress = await prisma.institutionAddress.create({
          data: {
            ...address,
            primary: !primaryAddress,
            institution_id: institution.id,
          },
        });
      }
    }

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

  public update = async (id: string, command: UpdateCommand) => {
    const { address, ...rest } = command;

    const institution = await prisma.institution.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    let institutionAddress: InstitutionAddress | null = null;

    if (address !== undefined) {
      const existingAddress = await prisma.institutionAddress.findFirst({
        where: {
          institution_id: id,
          primary: true,
        },
      });

      if (existingAddress) {
        await prisma.institutionAddress.update({
          where: {
            id: existingAddress.id,
          },
          data: {
            primary: false,
          },
        });
      }

      if (address.id) {
        institutionAddress = await prisma.institutionAddress.update({
          where: {
            id: address.id,
          },
          data: {
            ...address,
            primary: true,
          },
        });
      } else {
        institutionAddress = await prisma.institutionAddress.create({
          data: {
            ...address,
            institution_id: institution.id,
            primary: true,
          },
        });
      }
    }

    return {
      ...institution,
      address: institutionAddress,
    };
  };

  public delete = async (institutionId: string) => {
    await prisma.institution.delete({
      where: {
        id: institutionId,
      },
    });

    return;
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
