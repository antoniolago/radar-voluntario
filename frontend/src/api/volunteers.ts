
import { AxiosResponse } from 'axios';
import { useApi } from '@/api';
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useGetVolunteersList = () => {
    const api = useApi();
    var queryOptions: UseQueryOptions<AxiosResponse<any>, Error, AxiosResponse<any>, string[]> = {
        queryFn: () => api.get("volunteers"),
        staleTime: Infinity,
        queryKey: ['volunteers']
    };
    const context = useQuery(queryOptions)
    return { ...context, data: context.data?.data === undefined ? {} as any : context.data?.data };
};

const useGetVolunteer = (id: string) => {
    const api = useApi();
    var queryOptions: UseQueryOptions<AxiosResponse<any>, Error, AxiosResponse<any>, string[]> = {
        queryFn: () => api.get("volunteers/"+id),
        staleTime: Infinity,
        queryKey: ['volunteer-'+id]
    };
    const context = useQuery(queryOptions)
    return { ...context, data: context.data?.data === undefined ? {} as any : context.data?.data };
};

const useGetVolunteersOpportunities = (id: string) => {
    const api = useApi();
    var queryOptions: UseQueryOptions<AxiosResponse<any>, Error, AxiosResponse<any>, string[]> = {
        queryFn: () => api.get("volunteers/"+id+"/opportunities"),
        staleTime: Infinity,
        queryKey: ['volunteer-opportunities-'+id]
    };
    const context = useQuery(queryOptions)
    return { ...context, data: context.data?.data === undefined ? {} as any : context.data?.data };
};


export const VolunteerService = {
    useGetVolunteer,
    useGetVolunteersList,
    useGetVolunteersOpportunities
};