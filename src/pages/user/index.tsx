import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Meta } from '@/components/meta';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import { ButtonLink } from '@/components/button-link';
import { ButtonGroup } from '@/components/button-group';
import { Pager } from '@/components/pager';
import { UserSort } from '@/features/user/user-types';
import {
    SearchUserForm,
    SearchUserFormValues
} from '@/features/user/components/search-user-form';
import { SortUserDropdown } from '@/features/user/components/sort-user-dropdown';
import { UserList } from '@/features/user/components/user-list';
import {
    useSearchUsers,
    searchUsers
} from '@/features/user/hooks/use-search-users';
import { auth } from '@/lib/auth';

const PAGE_SIZE = 5;

const schema = z.object({
    search: z.string().catch(''),
    page: z.coerce.number().int().positive().catch(1),
    sort: z.nativeEnum(UserSort).catch(UserSort.NAME_ASC)
});

const UsersPage = () => {
    const router = useRouter();
    const params = schema.parse(router.query);
    const request = { ...params, size: PAGE_SIZE };

    const { data, isLoading, isError, isFetching, isPending } = useSearchUsers(
        request,
        router.isReady
    );

    const onSubmit = (values: SearchUserFormValues) =>
        router.replace({ query: { ...params, ...values, page: 1 } });

    const onNextPage = () =>
        router.replace({ query: { ...params, page: params.page + 1 } });

    const onPreviousPage = () =>
        router.replace({ query: { ...params, page: params.page - 1 } });

    const onSort = (sort: UserSort) =>
        router.replace({
            query: { ...params, sort }
        });

    return (
        <>
            <Meta title="Users" />

            <Container>
                <Title>Users</Title>

                <div className="mb-3 flex gap-1">
                    <SearchUserForm
                        values={params}
                        onSubmit={onSubmit}
                        isLoading={isFetching || isError}
                    />
                    <SortUserDropdown
                        selected={params.sort}
                        onSelect={onSort}
                        isLoading={isFetching || isError}
                    />
                </div>

                <ButtonGroup className="mb-3">
                    <ButtonLink href="/user/create" variant="primary">
                        Create New
                    </ButtonLink>
                </ButtonGroup>

                <UserList
                    isLoading={isLoading || isPending || isError}
                    users={data?.items}
                />

                <Pager
                    isLoading={isLoading || isError}
                    isFetching={isFetching}
                    hasNextPage={data?.hasNextPage}
                    hasPreviousPage={data?.hasPreviousPage}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                />
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await auth(context);

    const queryClient = new QueryClient();

    const params = schema.parse(context.query);
    const request = { ...params, size: PAGE_SIZE };

    await queryClient.prefetchQuery({
        queryKey: ['users', request],
        queryFn: () =>
            searchUsers(request, {
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`
                }
            })
    });

    return {
        props: {
            session,
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default UsersPage;
