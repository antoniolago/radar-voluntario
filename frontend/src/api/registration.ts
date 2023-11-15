
import { AxiosResponse } from 'axios';
import { useApi } from '@/api';
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Registration } from '@/types/registration';
import { toast } from 'sonner';
import { Opportunity } from '@/types/opportunity';

const usePostRegistration = () => {
    const api = useApi();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (opportunity: { opportunity_id: string }) => {
            const response = await api.post('/registrations', opportunity);
            return response.data;
        },
        onSuccess: (data: Registration) => {
            toast.success('Inscrição realizada');
            queryClient.invalidateQueries(['registration-'+data.opportunity_id])
            return data;
        },
        onError: (error) => {
            toast.error("Houve algum erro ao registrar, por favor tente novamente.");
        },
    });
}


const useGetRegistration = (id: string) => {
    const api = useApi();
    var queryOptions: UseQueryOptions<AxiosResponse<Registration>, Error, AxiosResponse<Registration>, string[]> = {
        queryFn: () => api.get("registrations/" + id),
        staleTime: Infinity,
        queryKey: ['registration-'+id]
    };
    const context = useQuery(queryOptions)
    return { ...context, data: context.data?.data === undefined ? {} as Registration : context.data?.data };
};


const useGetRegistrationList = () => {
  const api = useApi();
  var queryOptions: UseQueryOptions<AxiosResponse<Opportunity[]>, Error, AxiosResponse<Opportunity[]>, string[]> = {
      queryFn: () => api.get("registrations/"),
      staleTime: Infinity,
      queryKey: ['registrations']
  };
  const context = useQuery(queryOptions)
  return { ...context, data: context.data?.data === undefined ? [] : context.data?.data };
};

const useDeleteRegistration = () => {
    const api = useApi();
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (id: string) => {
        const response = await api.delete('registrations/' + id)
        return response.data;
      },
      onSuccess: (data: Registration) => {
        queryClient.invalidateQueries(['registration-'+data.opportunity_id])
        toast.success('Inscrição removida');
      },
      onError: (error) => {
        toast.error("Houve algum erro ao exclurr, por favor tente novamente.");
      },
    });
  }

export const RegistrationService = {
    usePostRegistration,
    useGetRegistration,
    useDeleteRegistration,
    useGetRegistrationList
};