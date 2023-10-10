import { Prisma } from "@prisma/client";
import { prisma } from "../database/prisma";
import axios from "axios";
import AppError from "../errors/app-error";

type OptionalFields = "id";

type SaveCommand = Omit<Prisma.InstitutionCreateManyInput, OptionalFields>;

type OptionalAddressFields =
  | "id"
  | "latitude"
  | "longitude"
  | "institution"
  | "institution_id";

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
        name: command.name,
        about: command.about,
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
    const response = await axios.get("https://geocode.maps.co/search", {
      params: {
        q: `${command.street}, ${command.number} - ${command.city}, ${command.state}`,
      },
      maxRedirects: 5,
    });

    const geocodeAddress = response.data[0];

    if (!geocodeAddress) {
      throw new AppError("Geocode not found", 404);
    }

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
        latitude: Number(geocodeAddress.lat),
        longitude: Number(geocodeAddress.lon),
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
