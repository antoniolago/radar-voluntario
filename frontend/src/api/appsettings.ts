import { AppSettings } from '@/types/appsettings';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useEffect } from 'react';
import AlertaReconectando from '@/components/AlertaReconectando';
import { api } from '.';
import { AxiosResponse } from 'axios';

export const useGetAppSettings = () => {
  const queryOptions: UseQueryOptions<AxiosResponse<AppSettings>, Error, AxiosResponse<AppSettings>, string[]> = {
    queryKey: ["appsettings"],
    queryFn: () => api.get("appSettings"),
    retry: true,
    staleTime: Infinity,
    // cacheTime: 3000000,
    enabled: true,
    retryDelay: 3000,
  };
  const context = useQuery(queryOptions)
  useEffect(() => {
    if(context.failureReason){
      toast.custom(AlertaReconectando);
    }
  }, [context.failureCount])
  return { ...context, data: context.data?.data };
};

export const AppSettingsService = {
  useGetAppSettings
}