import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.OpportunityCreateManyInput, OptionalFields>;

export class OpportunitiesService {
  public index = async (institutionId: string) => {
    const opportunities = await prisma.opportunity.findMany({
      where: { institution_id: institutionId },
    });

    return opportunities;
  };

  public get = async (id: string) => {
    const opportunity = await prisma.opportunity.findUnique({
      where: { id: id },
    });

    return opportunity;
  };

  public save = async (command: SaveCommand, userId: string) => {
    const institution = await prisma.institution.findUnique({
      where: {
        id: command.institution_id,
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
        ...command,
        institution_id: institution.id,
      },
    });

    return opportunity;
  };

  public update = async (
    opportunityId: string,
    command: SaveCommand,
    userId: string
  ) => {
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

    return await prisma.opportunity.update({
      where: {
        id: opportunity.id,
      },
      data: {
        ...command,
      },
    });
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
  }
}
