import { Metadata } from 'next';
import { z } from 'zod';
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from '@tanstack/react-query';
import { UserSort } from '@/features/user/user-types';
import { searchUsers } from '@/features/user/hooks/use-search-users';
import { auth } from '@/lib/auth';

import SearchUsersContent from './content';

export const metadata: Metadata = {
    title: 'Users'
};

type SearchUsersPageProps = {
    params: any;
};

const PAGE_SIZE = 5;

const schema = z.object({
    search: z.string().catch(''),
    page: z.coerce.number().int().positive().catch(1),
    sort: z.nativeEnum(UserSort).catch(UserSort.NAME_ASC)
});

export default async function SearchUsersPage({
    params
}: SearchUsersPageProps) {
    const session = await auth();

    const queryClient = new QueryClient();

    const searchParams = await params;
    const request = { ...schema.parse(searchParams), size: PAGE_SIZE };

    await queryClient.prefetchQuery({
        queryKey: ['users', request],
        queryFn: () =>
            searchUsers(request, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            })
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SearchUsersContent />
        </HydrationBoundary>
    );
}
