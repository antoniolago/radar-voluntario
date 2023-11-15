import { apiRoutes } from '@/routes';
import { setToken, useApi } from '@/api';
import { User } from '@/types/user';
import { AxiosError, AxiosResponse } from 'axios';
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthenticationResponse } from '@/types/authenticate-response';
import { CredentialResponse } from '@react-oauth/google';
import { toast } from 'sonner';

const useLogin = (credentialResponse: CredentialResponse) => {
  const api = useApi();
  const queryClient = useQueryClient()

  const mutationOptions: UseMutationOptions = {
    mutationFn: () => api.post<AuthenticationResponse>(apiRoutes.loginGoogle, credentialResponse)
      .then((res: AxiosResponse<AuthenticationResponse>) => {
        setToken(res.data.token);
        toast.success('Bem-vindo ' + res.data.user.name);
        queryClient.invalidateQueries(["user"])
        window.location.reload();
      }).catch((err: AxiosError) => {
        toast.error("Houve algum erro no login, por favor tente novamente. " + err.message);
      })
  };
  return useMutation(mutationOptions)

}

const useGetUser = () => {
  const api = useApi();
  const queryOptions: UseQueryOptions<AxiosResponse<User>, Error, AxiosResponse<User>, string[]> = {
    retry: false,
    queryFn: () => api.get("accounts"),
    staleTime: Infinity,
    enabled: true,
    retryOnMount: false,
    queryKey: ['user']
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data };
};

const useUpdateUser = () => {
  const api = useApi();
  const queryClient = useQueryClient();

 return useMutation({
    mutationFn: async (user: User) => {
      const response = await api.put('accounts', user);
      return response.data;
    },
    onSuccess: (data: User) => {
      toast.success('Perfil atualizado');
      queryClient.invalidateQueries(['user']);
    },
    onError: (error) => {
      toast.error("Houve algum erro ao salvar, por favor tente novamente.");
    },
  });
}

const useDeleteUser = () => {
  const api = useApi();
 return useMutation({
    mutationFn: async () => {
      const response = await api.delete('accounts');
      return response.data;
    },
    onSuccess: (data: User) => {
      setToken("");
      toast.success('Perfil excluído');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    },
    onError: (error) => {
      toast.error("Houve algum erro ao excluir a conta, por favor tente novamente.");
    },
  });
}

export const AuthService = {
  useLogin,
  useGetUser,
  useUpdateUser,
  useDeleteUser
}