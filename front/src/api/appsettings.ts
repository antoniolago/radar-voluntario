import { apiRoutes } from '@/routes';
import { QueryKeyT, useFetch } from '@/utils/reactQuery';
import { AppSettings } from '@/types/appsettings';
import { UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useEffect } from 'react';
import AlertaReconectando from '@/components/AlertaReconectando';

export const useGetAppSettings = () => {
  var queryOptions: UseQueryOptions<AppSettings, Error, AppSettings, QueryKeyT> = {
    // queryKey: ["appsettings"],
    retry: true,
    // cacheTime: 3000000,
    enabled: true,
    retryDelay: 3000,
  };
  const context = useFetch<AppSettings>(
    apiRoutes.getAppSettings,
    undefined,
    queryOptions
  );
  useEffect(() => {
    if(context.failureReason){
      toast.custom(AlertaReconectando);
    }
  }, [context.failureCount])
  return { ...context, data: context.data };
};

export const AppSettingsService = {
  useGetAppSettings
}