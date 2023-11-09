import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.OpportunityUserCreateManyInput, OptionalFields>;

export class RegistrationsService {
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

    public save = async (command: SaveCommand, user_id: string) => {
        const { opportunity_id } = command;

        const existingRegistration = await prisma.opportunityUser.findFirst({
            where: {
                opportunity_id: opportunity_id,
                user_id: user_id,
            },
        });

        if (existingRegistration) {
            throw new AppError("Cadastro em oportunidade já realizado", 400);
        }

        const opportunity = await prisma.opportunity.findUnique({
            where: {
                id: opportunity_id,
            },
        });
        if (!opportunity) {
            throw new AppError("Opportunity not found", 400);
        }

        const registration = await prisma.opportunityUser.create({
            data: {
                opportunity_id: opportunity_id,
                user_id: user_id,
            },
        });
        return { registration }
    };
}
