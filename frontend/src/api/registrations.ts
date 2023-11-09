
import { AxiosResponse } from 'axios';
import { useApi } from '@/api';
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Registration } from '@/types/registration';
import { toast } from 'sonner';

const usePostRegistration = () => {
    const api = useApi();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (opportunityId: string) => {
            const response = await api.post('/registrations', opportunityId);
            return response.data;
        },
        onSuccess: (data: Registration) => {
            toast.success('Cadastro realizado');
            queryClient.invalidateQueries(['opportunities'])
            return data;
        },
        onError: (error) => {
            toast.error("Houve algum erro ao registrar, por favor tente novamente.");
        },
    });
}

export const RegistrationService = {
    usePostRegistration
}