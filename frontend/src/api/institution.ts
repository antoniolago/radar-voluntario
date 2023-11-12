
import { AxiosResponse } from 'axios';
import {  useApi } from '@/api';
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


const useGetInstitution = () => {
    const api = useApi();
    var queryOptions: UseQueryOptions<AxiosResponse<any[]>, Error, AxiosResponse<any[]>, string[]> = {
      retry: false,
      queryFn: () => api.get("institutions/me"),
      staleTime: Infinity,
      enabled: true,
      retryOnMount: false,
      queryKey: ['institution']
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

  export const InstitutionService = {
    useGetInstitution,
    useGetInstitutions,
    useGetUserInstitutions
  }