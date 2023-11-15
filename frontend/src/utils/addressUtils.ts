import { IAddress } from "@/types/address"

export const getFullAddress = (address?: IAddress) => {
    if(address === undefined || address === null){
        return 'Não informado'
    }
    return `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city}/${address.state}, ${address.zip_code}`
}

export const getCityState = (address: IAddress) => {
    if(address === undefined || address === null){
        return 'Não informado'
    }
    return address.neighborhood+', '+address.city+'/'+address.state;
}
     