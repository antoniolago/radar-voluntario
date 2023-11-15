import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.UserCreateManyInput, OptionalFields>;

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

}
