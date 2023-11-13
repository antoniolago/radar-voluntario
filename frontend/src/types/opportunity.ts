import { IAddress } from "./address";

export interface Opportunity {
    id: string,
    name: string,
    description: string,
    institution_id: string,
    vacancies: number,
    published: boolean,
    online: boolean,
    address_id: string
    start_date: Date,
    end_date: Date,
    institution?: any,
    address?: IAddress,
}