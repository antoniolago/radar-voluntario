export interface Opportunity {
    id: string,
    name: string,
    description: string
    institution_id: string
    vacancies: number
    address_id: string
    date: Date,
    start_time: any,
    end_time: any,
}