import { apiRoutes } from '@/routes';
import { api } from '@/utils/api';
import { useFetch } from '@/utils/reactQuery';
import { User } from '@/types/user';

export const useLogin = (email: string, password: string) =>
  api.post<{ token: string }>(apiRoutes.login, {
    email,
    password,
  });

export const useGetUser = () => {
  const context = useFetch<{ user: User }>(
    apiRoutes.getUser,
    undefined,
    { retry: false }
  );
  return { ...context, data: context.data?.user };
};