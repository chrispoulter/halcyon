import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import {
    SearchUsersRequest,
    SearchUsersResponse
} from '@/features/user/user-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

export const searchUsers = (
    request: SearchUsersRequest,
    init?: RequestInit
) => {
    const params = Object.entries(request)
        .map(pair => pair.map(encodeURIComponent).join('='))
        .join('&');

    return fetcher<SearchUsersResponse>(
        `${config.API_URL}/user?${params}`,
        init
    );
};

export const useSearchUsers = (request: SearchUsersRequest, enabled = true) => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    return useQuery({
        queryKey: ['users', request],
        queryFn: () =>
            searchUsers(request, {
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            }),
        placeholderData: keepPreviousData,
        enabled: enabled && !loading
    });
};
