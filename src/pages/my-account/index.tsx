import { GetServerSideProps } from 'next';
import { signOut } from 'next-auth/react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { auth } from '@/lib/auth';
import { Meta } from '@/components/meta';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import { PersonalDetailsCard } from '@/features/manage/components/personal-details-card';
import { LoginDetailsCard } from '@/features/manage/components/login-details-card';
import { AccountSettingsCard } from '@/features/manage/components/account-settings-card';
import {
    getProfile,
    useGetProfile
} from '@/features/manage/hooks/use-get-profile';
import { useDeleteAccount } from '@/features/manage/hooks/use-delete-account';

const MyAccountPage = () => {
    const { data } = useGetProfile();

    const version = data?.version;

    const { mutate, isPending } = useDeleteAccount();

    const onDelete = () =>
        mutate(
            { version },
            {
                onSuccess: async () => {
                    toast.success('Your account has been deleted.');
                    await signOut({ callbackUrl: '/' });
                }
            }
        );

    return (
        <>
            <Meta title="My Account" />

            <Container>
                <Title>My Account</Title>
                <PersonalDetailsCard profile={data} className="mb-5" />
                <LoginDetailsCard profile={data} className="mb-5" />

                <AccountSettingsCard
                    profile={data}
                    isDeleting={isPending}
                    onDelete={onDelete}
                />
            </Container>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await auth(context);

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['profile'],
        queryFn: () =>
            getProfile({
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

export default MyAccountPage;
