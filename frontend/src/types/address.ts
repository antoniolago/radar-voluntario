import { Coordenates } from "./coords"

export interface IAddress {
    name: string;
    cep: string;
    state: string;
    district: string;
    city: string;
    address: string;
    number: string;
    complement: string; 
    coordenates: Coordenates;
}