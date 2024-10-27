import { Metadata } from 'next';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from '@tanstack/react-query';
import { getProfile } from '@/features/profile/hooks/use-get-profile';
import { auth } from '@/lib/auth';

import UpdateProfileContent from './content';

export const metadata: Metadata = {
    title: 'Update Profile'
};

export default async function UpdateProfilePage() {
    const session = await auth();

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['profile'],
        queryFn: () =>
            getProfile({
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            })
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UpdateProfileContent />;
        </HydrationBoundary>
    );
}
