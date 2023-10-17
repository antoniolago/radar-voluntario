import AlertaReconectando from "@/components/AlertaReconectando";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { toast } from "sonner";

const useGetCurrentLocation = () => {

    const queryOptions: UseQueryOptions<LatLngExpression, Error, LatLngExpression, string[]> = {
        queryKey: ["user-geoloc"],
        queryFn: () => new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(function (pos) {
                const latitude = pos.coords.latitude;
                const longitude = pos.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                resolve([latitude, longitude]);
            }, () => toast.error("Erro geolocalização."))
        }),
        retry: true,
        staleTime: Infinity,
        // cacheTime: 3000000,
        enabled: true,
        retryDelay: 3000,
    };
    const context = useQuery(queryOptions)
    useEffect(() => {
        if (context.failureReason) {
            toast.custom(AlertaReconectando);
        }
    }, [context.failureCount])
    return { ...context, data: context.data };
}

export const GeoLocationService = {
    useGetCurrentLocation
}