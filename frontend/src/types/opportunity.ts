import { Dayjs } from "dayjs";
import { IAddress } from "./address";
import { Institution } from "./institution";

export interface Opportunity {
    id: string,
    name: string,
    description: string,
    institution_id: string,
    vacancies: number,
    published: boolean,
    online: boolean,
    start_date: Dayjs,
    end_date: Dayjs,
    institution?: Institution,
    address?: IAddress,
    users?: any,
}