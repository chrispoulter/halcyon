import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdatedResponse } from '@/features/common';
import { fetcher } from '@/utils/fetch';
import { config } from '@/utils/config';

export type DeleteUserRequest = { version?: number };

const deleteUser = (id: string, request: DeleteUserRequest) =>
    fetcher<UpdatedResponse>(`${config.API_URL}/user/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(request)
    });

export const useDeleteUser = (id: string) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (request: DeleteUserRequest) => deleteUser(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });

            queryClient.invalidateQueries({
                queryKey: ['user', id],
                refetchType: 'none'
            });
        }
    });

    return { deleteUser: mutateAsync, isDeleting: isPending };
};