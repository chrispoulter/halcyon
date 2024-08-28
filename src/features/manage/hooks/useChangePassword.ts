import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { UpdatedResponse } from '@/features/common/commonTypes';
import { ChangePasswordRequest } from '@/features/manage/manageTypes';
import { fetcher } from '@/utils/fetch';
import { config } from '@/utils/config';

const changePassword = (request: ChangePasswordRequest, init?: RequestInit) =>
    fetcher<UpdatedResponse>(`${config.API_URL}/manage/change-password`, {
        ...init,
        method: 'PUT',
        body: JSON.stringify(request)
    });

export const useChangePassword = () => {
    const { data: session } = useSession();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (request: ChangePasswordRequest) =>
            changePassword(request, {
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            }),
        onSuccess: data => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user', data.id] });
        }
    });
};