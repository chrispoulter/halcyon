import { Metadata } from 'next';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from '@tanstack/react-query';
import { getProfile } from '@/features/profile/hooks/use-get-profile';
import { auth } from '@/lib/auth';

import ProfileContent from './content';

export const metadata: Metadata = {
    title: 'My Account'
};

export default async function ProfilePage() {
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
            <ProfileContent />;
        </HydrationBoundary>
    );
}
