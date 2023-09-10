import { apiRoutes } from '@/routes';
import { QueryKeyT, useFetch } from '@/utils/reactQuery';
import { AppSettings } from '@/types/appsettings';
import { UseQueryOptions } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { AuthenticationResponse } from '@/types/authenticate-response';

const onSettled = (res: AppSettings | undefined) => {
  console.log("TESTES")
    toast.success('Teste');
};
export const useGetAppSettings = () => {
  var queryOptions: UseQueryOptions<AppSettings, Error, AppSettings, QueryKeyT> = { 
    retry: false ,
    onSettled: onSettled,
    enabled: true
  };
  const context = useFetch<AppSettings>(
    apiRoutes.getAppSettings,
    undefined,
    queryOptions
  );
  return { ...context, data: context.data };
};