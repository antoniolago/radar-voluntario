
import { AxiosError, AxiosResponse } from 'axios';
import { apiRoutes } from '@/routes';
import {  useApi } from '@/api';
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Institution } from '@/types/institution';
import { Opportunity } from '@/types/opportunity';
import { toast } from 'sonner';


const usePostOpportunity = () => {
    const api = useApi();
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (opportunityForm: Opportunity) => {
          return api.post('opportunities', opportunityForm)
            .then((response) => response.data);
        },
        onSuccess: (data) => {
            toast.success('Perfil atualizado');
        },
        onError: (error) => {
          toast.error("Houve algum erro ao salvar, por favor tente novamente.");
        },
      });
  }

  export const OpportunityService = {
    usePostOpportunity
  }