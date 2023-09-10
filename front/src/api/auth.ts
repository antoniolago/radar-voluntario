import { apiRoutes } from '@/routes';
import { api } from '@/utils/api';
import { useFetch } from '@/utils/reactQuery';
import { User } from '@/types/user';
import { CredentialResponse } from '@react-oauth/google';

export const useLogin = (email: string, password: string) =>
  api.post<{ token: string }>(apiRoutes.login, {
    email,
    password,
  });

export const useLoginGoogle = (credentialResponse: CredentialResponse) =>
  api.post(apiRoutes.loginGoogle, credentialResponse);

export const useGetUser = () => {
  const context = useFetch<User>(
    apiRoutes.getUser,
    undefined,
    { retry: false }
  );
  return { ...context, data: context.data };
};