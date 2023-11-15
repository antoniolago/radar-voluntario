import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.UserCreateManyInput, OptionalFields>;

export class VolunteersService {
    public index = async (userId: string) => {

        const institutions = await prisma.institutionUser.findMany({
            select: {
                id: true
            },
            where: {
                user_id: userId,
            },
        });
        
        if (!institutions) {
            throw new AppError("No data found", 400);
        }

        const institutionsIds = institutions.map((institution) => institution.id);

        const usersByInstitution = await prisma.user.findMany({
            where: {
                opportunities: {
                some: {
                    opportunity: {
                        institution_id: {
                            in: institutionsIds,
                        },
                  },
                },
              },
            },
            include: { opportunities: true }
          });
          

        return usersByInstitution;
    };

}
