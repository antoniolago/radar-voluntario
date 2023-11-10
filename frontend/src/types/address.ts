import { Coordenates } from "./coords"

export interface IAddress {
    name: string;
    zip_code: string;
    street: string;
    state: string;
    district: string;
    city: string;
    neighborhood: string;
    number: string;
    complement: string; 
    coordenates: Coordenates;
}