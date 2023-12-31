import { Coordenates } from "./coords"

export interface IAddress {
    id: string;
    name: string;
    zip_code: string;
    street: string;
    state: string;
    city: string;
    neighborhood: string;
    number: string;
    complement: string;
    latitude: number;
    longitude: number;
}