
import { AxiosResponse } from 'axios';
import {  useApi } from '@/api';
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Institution } from '@/types/institution';
import { IAddress } from '@/types/address';


const useGetInstitution = (id: any) => {
    const api = useApi();
    var queryOptions: UseQueryOptions<AxiosResponse<Institution>, Error, AxiosResponse<Institution>, string[]> = {
      retry: false,
      queryFn: () => api.get("institution/"+id),
      staleTime: Infinity,
      enabled: true,
      retryOnMount: false,
      queryKey: ['institution', id]
    };
    const context = useQuery(queryOptions)
    return { ...context, data: context.data?.data };
  };
  const useGetInstitutions = () => {
    const api = useApi();
    var queryOptions: UseQueryOptions<AxiosResponse<any[]>, Error, AxiosResponse<any[]>, string[]> = {
      retry: false,
      queryFn: () => api.get("institutions"),
      staleTime: Infinity,
      enabled: true,
      retryOnMount: false,
      queryKey: ['institutions']
    };
    const context = useQuery(queryOptions)
    return { ...context, data: context.data?.data };
  }
  const useGetUserInstitutions = () => {
    const api = useApi();
    var queryOptions: UseQueryOptions<AxiosResponse<any[]>, Error, AxiosResponse<any[]>, string[]> = {
      retry: false,
      queryFn: () => api.get("institutions/me"),
      staleTime: Infinity,
      enabled: true,
      retryOnMount: false,
      queryKey: ['user-institutions']
    };
    const context = useQuery(queryOptions)
    return { ...context, data: context.data?.data };
  }

  const useGetInstitutionAddresses = (id: string | undefined) => {
    const api = useApi();
    var queryOptions: UseQueryOptions<AxiosResponse<IAddress[]>, Error, AxiosResponse<IAddress[]>, string[]> = {
      retry: false,
      queryFn: () => api.get(`institution/${id}/addresses`),
      staleTime: Infinity,
      enabled: false,
      retryOnMount: false,
      queryKey: ['user-institutions']
    };
    const context = useQuery(queryOptions)
    return { ...context, data: context.data?.data };
  }

  export const InstitutionService = {
    useGetInstitution,
    useGetInstitutions,
    useGetUserInstitutions,
    useGetInstitutionAddresses
  }