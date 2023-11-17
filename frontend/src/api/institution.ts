
import { AxiosResponse } from 'axios';
import { useApi } from '@/api';
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Institution } from '@/types/institution';
import { IAddress } from '@/types/address';
import { toast } from 'sonner';


const useGetInstitution = (id: any) => {
  const api = useApi();
  var queryOptions: UseQueryOptions<AxiosResponse<Institution>, Error, AxiosResponse<Institution>, string[]> = {
    retry: false,
    queryFn: () => api.get("institution/" + id),
    staleTime: Infinity,
    enabled: true,
    retryOnMount: false,
    queryKey: ['institution', id]
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data };
};
const useGetInstitutions = () => {
  const api = useApi();
  var queryOptions: UseQueryOptions<AxiosResponse<any[]>, Error, AxiosResponse<any[]>, string[]> = {
    retry: false,
    queryFn: () => api.get("institutions"),
    staleTime: Infinity,
    enabled: true,
    retryOnMount: false,
    queryKey: ['institutions']
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data };
}
const usePostNewInstitution = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (institution: Institution) => {
      const response = await api.post<Institution>('/institutions', institution)
        .then((res: AxiosResponse<Institution>) => {
          toast.success('Instituição criada com sucesso.');
          queryClient.invalidateQueries(['institutions', 'user-institutions'])
          return res;
        }).catch(() => {
          toast.error("Houve algum erro ao salvar, por favor tente novamente.");
        });
      return response;
    },
  });
}
const usePutInstitution = (id: any) => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (institution: Institution) => {
      const response = await api.put<Institution>('/institution/'+id, institution)
        .then((res: AxiosResponse<Institution>) => {
          toast.success('Instituição editada com sucesso.');
          queryClient.invalidateQueries(['institutions', 'user-institutions', ['institution', id]])
          return res;
        }).catch(() => {
          toast.error("Houve algum erro ao salvar, por favor tente novamente.");
        });
      return response;
    },
  });
}
const useDeleteInstitution = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete('/institution/' + id)
        .then((res: AxiosResponse) => {
          toast.success('Organização deletada com sucesso.');
          queryClient.invalidateQueries(['institutions', 'user-institutions'])
          return res;
        }).catch(() => {
          toast.error("Houve algum erro ao deletar a organização, por favor tente novamente.");
        });
      return response;
    },
  })
}
const useGetUserInstitutions = () => {
  const api = useApi();
  var queryOptions: UseQueryOptions<AxiosResponse<any[]>, Error, AxiosResponse<any[]>, string[]> = {
    retry: false,
    queryFn: () => api.get("institutions/me"),
    staleTime: Infinity,
    enabled: true,
    retryOnMount: false,
    queryKey: ['user-institutions']
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data };
}

const useGetInstitutionAddresses = (id: string | undefined) => {
  const api = useApi();
  var queryOptions: UseQueryOptions<AxiosResponse<IAddress[]>, Error, AxiosResponse<IAddress[]>, string[]> = {
    retry: false,
    queryFn: () => api.get(`institution/${id}/addresses`),
    staleTime: Infinity,
    enabled: false,
    retryOnMount: false,
    queryKey: ['institutions-adressess']
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data === undefined ? [] : context.data?.data };

}

export const InstitutionService = {
  useGetInstitution,
  useGetInstitutions,
  useGetUserInstitutions,
  useGetInstitutionAddresses,
  usePostNewInstitution,
  useDeleteInstitution,
  usePutInstitution
}