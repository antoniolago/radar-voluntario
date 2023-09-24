import { apiRoutes } from '@/routes';
import { api } from '@/api';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

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