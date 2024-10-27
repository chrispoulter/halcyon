'use client';

// import { Metadata } from 'next';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import { PersonalDetailsCard } from '@/features/profile/components/personal-details-card';
import { LoginDetailsCard } from '@/features/profile/components/login-details-card';
import { AccountSettingsCard } from '@/features/profile/components/account-settings-card';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';
import { useDeleteAccount } from '@/features/profile/hooks/use-delete-account';

// export const metadata: Metadata = {
//     title: 'My Account'
// };

export default function ProfilePage() {
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
    );
}
