import { IAddress } from "./address";
import { User } from "./user";

export interface Institution {
    id: string;
    name: string;
    about: string;
    picture: string;
    address: IAddress;
    owner_id: string;
    owner: User;
    telephone: string;
    facebook: string;
    instagram: string;
}