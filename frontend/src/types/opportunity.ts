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
    start_date: any,
    end_date: any,
    institution?: any,
    address?: IAddress,
}