import { apiRoutes } from '@/routes';
import { useFetch } from '@/utils/reactQuery';
import { AppSettings } from '@/types/appsettings';

export const useGetAppSettings = () => {
  const context = useFetch<AppSettings>(
    apiRoutes.getAppSettings,
    undefined,
    { retry: false }
  );
  return { ...context, data: context.data };
};