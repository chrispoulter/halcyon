import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { GetProfileResponse } from '@/features/profile/profile-types';
import { fetcher } from '@/lib/fetch';
import { config } from '@/lib/config';

export const getProfile = (init?: RequestInit) =>
    fetcher<GetProfileResponse>(`${config.API_URL}/profile`, init);

export const useGetProfile = () => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    return useQuery({
        queryKey: ['profile'],
        queryFn: () =>
            getProfile({
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            }),
        enabled: !loading
    });
};
