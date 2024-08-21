import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Meta } from '@/components/Meta/Meta';
import { Container } from '@/components/Container/Container';
import { SubTitle, Title } from '@/components/Title/Title';
import { ButtonLink } from '@/components/Button/ButtonLink';
import { ConfirmUnlockUser } from '@/features/user/ConfirmUnlockUser/ConfirmUnlockUser';
import { ConfirmLockUser } from '@/features/user/ConfirmLockUser/ConfirmLockUser';
import { ConfirmDeleteUser } from '@/features/user/ConfirmDeleteUser/ConfirmDeleteUser';
import {
    UpdateUserForm,
    UpdateUserFormState,
    UpdateUserFormValues
} from '@/features/user/UpdateUserForm/UpdateUserForm';
import { useGetUser } from '@/features/user/hooks/useGetUser';
import { useUpdateUser } from '@/features/user/hooks/useUpdateUser';
import { useLockUser } from '@/features/user/hooks/useLockUser';
import { useUnlockUser } from '@/features/user/hooks/useUnlockUser';
import { useDeleteUser } from '@/features/user/hooks/useDeleteUser';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const UpdateUserPage = () => {
    const router = useRouter();

    const id = router.query.id as string;

    const { user, isFetching } = useGetUser(id);

    const { updateUser } = useUpdateUser(id);

    const { lockUser, isLocking } = useLockUser(id);

    const { unlockUser, isUnlocking } = useUnlockUser(id);

    const { deleteUser, isDeleting } = useDeleteUser(id);

    const version = user?.version;

    const onSubmit = async (values: UpdateUserFormValues) => {
        await updateUser({ ...values, version });
        toast.success('User successfully updated.');
        await router.push('/user');
    };

    const onDelete = async () => {
        await deleteUser({ version });
        toast.success('User successfully deleted.');
        await router.push('/user');
    };

    const onLock = async () => {
        await lockUser({ version });
        toast.success('User successfully locked.');
    };

    const onUnlock = async () => {
        await unlockUser({ version });
        toast.success('User successfully unlocked.');
    };

    const options = ({ isSubmitting }: UpdateUserFormState) => (
        <>
            <ButtonLink href="/user" variant="secondary">
                Cancel
            </ButtonLink>

            {user?.isLockedOut ? (
                <ConfirmUnlockUser
                    onConfirm={onUnlock}
                    loading={isUnlocking}
                    disabled={
                        isDeleting || isLocking || isSubmitting || isFetching
                    }
                />
            ) : (
                <ConfirmLockUser
                    onConfirm={onLock}
                    loading={isLocking}
                    disabled={
                        isDeleting || isUnlocking || isSubmitting || isFetching
                    }
                />
            )}

            <ConfirmDeleteUser
                onConfirm={onDelete}
                loading={isDeleting}
                disabled={
                    isUnlocking || isLocking || isSubmitting || isFetching
                }
            />
        </>
    );

    return (
        <>
            <Meta title="Update User" />

            <Container>
                <Title>
                    User
                    <SubTitle>Update</SubTitle>
                </Title>

                <UpdateUserForm
                    user={user}
                    isDisabled={
                        isUnlocking || isLocking || isDeleting || isFetching
                    }
                    onSubmit={onSubmit}
                    options={options}
                />
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({
    req,
    res,
    params
}) => {
    const session = await getServerSession(req, res, authOptions);

    const id = params?.id as string;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['user', id], () =>
        getUser(id, {
            headers: {
                cookie: req.headers.cookie!
            }
        })
    );

    return {
        props: {
            session,
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default UpdateUserPage;
