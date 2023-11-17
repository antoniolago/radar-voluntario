import { InstitutionAddress, Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.OpportunityCreateManyInput, OptionalFields> & {
  address: Omit<
    Prisma.InstitutionAddressCreateManyInput,
    OptionalAddressFields
  >;
};

type UpdateCommand = Omit<SaveCommand, "address"> & {
  address: Omit<
    Prisma.InstitutionAddressCreateManyInput,
    "institution" | "institution_id"
  >;
};

type OptionalAddressFields = "id" | "institution" | "institution_id";

export class OpportunitiesService {
  public index = async (institutionId: string) => {
    const opportunities = await prisma.opportunity.findMany({
      where: { institution_id: institutionId },
      include: {
        institution: true,
        address: true,
        users: { include: { user: true } },
      },
    });

    return opportunities.map((opportunity) => ({
      ...opportunity,
      users: opportunity.users.map((user) => user),
    }));
  };

  public get = async (id: string) => {
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: id },
      include: {
        institution: true,
        address: true,
        users: {
          select : {
            user_id: true
          }
        },
      },
    });

    if (!opportunity) return null;

    return {
      ...opportunity,
      users: opportunity.users.map((user) => user),
    };
  };

  public getPublished = async (id: string) => {
    const opportunity = await prisma.opportunity.findUnique({
      where: {
        id: id,
        published: true,
      },
      include: {
        institution: true,
        address: true,
        users: {
          select : {
            user_id: true
          }
        },
      },
    });

    return opportunity;
  };

  //TODO Não mostrar oportunidades que ja passaram da data
  //TODO Não mostrar oportunidades com numero max de voluntários
  public getPublishedList = async (institutionId: string) => {
    const opportunities = await prisma.opportunity.findMany({
      where: {
        institution_id: institutionId,
        published: true
      },
      include: {
        institution: true,
        address: true,
        users: { include: { user: true } },
      },
    });

    return opportunities.map((opportunity) => ({
      ...opportunity,
      users: opportunity.users.map((user) => user),
    }));
  };


  public save = async (command: SaveCommand, userId: string) => {
    const { address, ...rest } = command;

    const institution = await prisma.institution.findUnique({
      where: {
        id: rest.institution_id,
      },
    });

    if (!institution) {
      throw new AppError("Institution not found", 400);
    }

    const institutionUser = await prisma.institutionUser.findFirst({
      where: {
        institution_id: institution.id,
        user_id: userId,
      },
    });

    if (!institutionUser) {
      throw new AppError("User not authorized", 400);
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        ...rest,
        institution_id: institution.id,
      },
    });

    return {
      ...opportunity,
      users: [],
    };
  };

  public update = async (
    opportunityId: string,
    command: UpdateCommand,
    userId: string
  ) => {
    const { address, ...rest } = command;

    const opportunity = await prisma.opportunity.findUnique({
      where: {
        id: opportunityId,
      },
    });

    if (!opportunity) {
      throw new AppError("Opportunity not found", 400);
    }

    const institution = await prisma.institution.findUnique({
      where: {
        id: opportunity.institution_id,
      },
    });

    if (!institution) {
      throw new AppError("Institution not found", 400);
    }

    let institutionAddress: InstitutionAddress | null = null;

    if (address) {
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

    const institutionUser = await prisma.institutionUser.findFirst({
      where: {
        institution_id: institution.id,
        user_id: userId,
      },
    });

    if (!institutionUser) {
      throw new AppError("User not authorized", 400);
    }

    const updatedOpportunity = await prisma.opportunity.update({
      where: {
        id: opportunity.id,
      },
      data: {
        ...rest,
        address_id: institutionAddress ? institutionAddress.id : undefined,
      },
      include: {
        institution: true,
        address: true,
        users: { include: { user: true } },
      },
    });

    return {
      ...updatedOpportunity,
      users: updatedOpportunity.users.map((user) => user),
    };
  };

  public delete = async (opportunityId: string, userId: string) => {
    const opportunity = await prisma.opportunity.findUnique({
      where: {
        id: opportunityId,
      },
    });

    if (!opportunity) {
      throw new AppError("Opportunity not found", 400);
    }

    const institution = await prisma.institution.findUnique({
      where: {
        id: opportunity.institution_id,
      },
    });

    if (!institution) {
      throw new AppError("Institution not found", 400);
    }

    const institutionUser = await prisma.institutionUser.findFirst({
      where: {
        institution_id: institution.id,
        user_id: userId,
      },
    });

    if (!institutionUser) {
      throw new AppError("User not authorized", 400);
    }

    await prisma.opportunity.delete({
      where: {
        id: opportunity.id,
      },
    });
  };
}
