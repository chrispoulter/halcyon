'use client';

// import { Metadata } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
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
import { useSearchUsers } from '@/features/user/hooks/use-search-users';

const PAGE_SIZE = 5;

const schema = z.object({
    search: z.string().catch(''),
    page: z.coerce.number().int().positive().catch(1),
    sort: z.nativeEnum(UserSort).catch(UserSort.NAME_ASC)
});

// export const metadata: Metadata = {
//     title: 'Users'
// };

export default function SearchUsersPage() {
    const router = useRouter();

    const pathname = usePathname();

    const query = useSearchParams();

    const params = schema.parse(query);

    const request = { ...params, size: PAGE_SIZE };

    const { data, isLoading, isError, isFetching, isPending } = useSearchUsers(
        request,
        true
    );

    const onSubmit = (values: SearchUserFormValues) => {
        const newParams = new URLSearchParams({
            ...params,
            ...values,
            page: '1'
        });

        return router.replace(`${pathname}?${newParams.toString()}`);
    };

    const onNextPage = () => {
        const newParams = new URLSearchParams({
            ...params,
            page: (params.page + 1).toString()
        });

        return router.replace(`${pathname}?${newParams.toString()}`);
    };

    const onPreviousPage = () => {
        const newParams = new URLSearchParams({
            ...params,
            page: (params.page - 1).toString()
        });

        return router.replace(`${pathname}?${newParams.toString()}`);
    };

    const onSort = (sort: UserSort) => {
        const newParams = new URLSearchParams({
            ...params,
            page: params.page.toString(),
            sort
        });

        return router.replace(`${pathname}?${newParams.toString()}`);
    };

    return (
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
    );
}
