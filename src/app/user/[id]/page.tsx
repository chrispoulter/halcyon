import { Metadata } from 'next';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from '@tanstack/react-query';
import { getUser } from '@/features/user/hooks/use-get-user';
import { auth } from '@/lib/auth';

import UpdateUserContent from './content';

export const metadata: Metadata = {
    title: 'Update User'
};

type UpdateUserPageParams = {
    params: Promise<{ id: string }>;
};

export default async function UpdateUserPage({ params }: UpdateUserPageParams) {
    const { id } = await params;

    const session = await auth();

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['user', id],
        queryFn: () =>
            getUser(id, {
                headers: { Authorization: `Bearer ${session?.accessToken}` }
            })
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UpdateUserContent id={id} />
        </HydrationBoundary>
    );
}
