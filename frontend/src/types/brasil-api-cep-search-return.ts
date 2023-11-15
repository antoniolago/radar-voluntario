
export interface Coordinates {
    longitude: string;
    latitude: string;
}

export interface Location {
    type: string;
    coordinates: Coordinates;
}

export interface BrasilApiAddress {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    service: string;
    location: Location;
}