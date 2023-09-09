import { apiRoutes } from '@/routes';
import { useFetch } from '@/utils/reactQuery';
import { AppSettings } from '@/types/appsettings';

export const useGetAppSettings = () => {
  const context = useFetch<{ appSettings: AppSettings }>(
    apiRoutes.getAppSettings,
    undefined,
    { retry: false }
  );
  return { ...context, data: context.data?.appSettings };
};