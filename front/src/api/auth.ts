import { apiRoutes } from '@/routes';
import { api } from '@/utils/api';
import { QueryKeyT, useFetch } from '@/utils/reactQuery';
import { User } from '@/types/user';
import { CredentialResponse } from '@react-oauth/google';
import { AuthenticationResponse } from '@/types/authenticate-response';
import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { UseQueryOptions, useQueryClient } from 'react-query';

export const useLogin = (email: string, password: string) =>
  api.post<{ token: string }>(apiRoutes.login, {
    email,
    password,
  });
export const useGetUser = () => {
  var queryOptions: UseQueryOptions<User, Error, User, string[]> = {
    retry: false,
    enabled: true,
    queryKey: ['user']
  };
  const context = useFetch<User>(
    apiRoutes.getUser,
    undefined,
    queryOptions
  );
  return { ...context, data: context.data };
};