import { apiRoutes } from '@/routes';
import { api } from '@/api';
import { User } from '@/types/user';
import { CredentialResponse } from '@react-oauth/google';
import { AuthenticationResponse } from '@/types/authenticate-response';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { UseQueryOptions, useQuery, useQueryClient } from 'react-query';

export const useLogin = (email: string, password: string) =>
  api.post<{ token: string }>(apiRoutes.login, {
    email,
    password,
  });
export const useGetUser = () => {
  var queryOptions: UseQueryOptions<AxiosResponse<User>, Error, AxiosResponse<User>, string[]> = {
    retry: false,
    queryFn: () => api.get("user"),
    staleTime: Infinity,
    enabled: true,
    queryKey: ['user']
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data };
};