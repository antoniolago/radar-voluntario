import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.OpportunityUserCreateManyInput, OptionalFields>;

export class RegistrationsService {
    public index = async (userId: string, opportunityId?: string) => {

        const opportunity = await prisma.opportunity.findUnique({
            where: {
                id: opportunityId,
            },
        });
        
        if (!opportunity) {
            throw new AppError("Opportunity not found", 400);
        }

        const registrations = await prisma.opportunityUser.findFirst({
            where: {
                user_id: userId,
                opportunity_id: opportunityId
            },
        });

        return registrations;
    };

    public getOpportunities = async (userId: string) => {

        const registrations = await prisma.opportunityUser.findMany({
            where: {
                user_id: userId,
            }
        })

        if (!registrations) {
            throw new AppError("Registration not found", 400);
        }
        const opportunityUserIds = registrations.map((opportunityUser) => opportunityUser.opportunity_id);

        const opportunities = await prisma.opportunity.findMany({
            where: {
                id: {
                    in: opportunityUserIds,
                },
            },
            include: { institution: true }
        })

        return opportunities;
    };


    public delete = async (registrationId: string, userId: string) => {
        const registrations = await prisma.opportunityUser.findUnique({
            where: {
                id: registrationId,
                user_id: userId,
            },
        });

        if (!registrations) {
            throw new AppError("Registration not found", 400);
        }

        const deletedRegistration = await prisma.opportunityUser.delete({
            where: {
                id: registrationId
            },
        });

        return deletedRegistration;
    }

    public save = async (command: SaveCommand, user_id: string) => {
        const { opportunity_id } = command;
        const existingRegistration = await prisma.opportunityUser.findFirst({
            where: {
                opportunity_id: opportunity_id,
                user_id: user_id,
            },
        });


        if (existingRegistration) {
            throw new AppError("Duplicate registration", 400);
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
        return registration
    };
}
