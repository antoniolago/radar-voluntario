import dayjs from "dayjs";

export const displayDateOnTable = (startDate: any, endDate: any) => {
    
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const isSameDay = start.isSame(end, 'day');

    if(isSameDay) {
        return start.format('DD/MM/YYYY')
    }
    return start.format('DD/MM/YYYY')+' - '+end.format('DD/MM/YYYY')
}

export const displayDateTime = (date: any) => {
    const formattedDate = dayjs(date);
    return formattedDate.format('DD/MM/YYYY - HH:mm')
}