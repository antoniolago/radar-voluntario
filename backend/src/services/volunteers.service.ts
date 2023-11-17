import { prisma } from "../database/prisma";


export class VolunteersService {
  public index = async (userId: string) => {

    const usersByInstitution = await prisma.user.findMany({
      where: {
        opportunities: {
          some: {
            opportunity: {
              institution: {
                owner_id: userId,
              },
            },
          },
        },
      },
      include: { opportunities: true }
    });

    return usersByInstitution;
  };


  public get = async (volunteerId: string) => {
    const volunteer = await prisma.user.findUnique({
      where: {
        id: volunteerId,
      },
    });

    return volunteer;
  };


  public getOpportunities = async (volunteerId: string) => {
    const opportunities = await prisma.opportunity.findMany({
      where: {
        users: {
          some: {
            user: {
                id: volunteerId,
            },
          },
        },
      },
      include: { institution: true }
    });
    return opportunities;
  };

  

}
