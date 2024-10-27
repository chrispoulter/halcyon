'use client';

// import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import { TextLink } from '@/components/text-link';
import { ButtonLink } from '@/components/button-link';
import {
    ChangePasswordForm,
    ChangePasswordFormValues
} from '@/features/profile/components/change-password-form';
import { useGetProfile } from '@/features/profile/hooks/use-get-profile';
import { useChangePassword } from '@/features/profile/hooks/use-change-password';

// export const metadata: Metadata = {
//     title: 'Change Password'
// };

export default function ChangePasswordPage() {
    const router = useRouter();

    const { data } = useGetProfile();

    const version = data?.version;

    const { mutate, isPending } = useChangePassword();

    const onSubmit = (values: ChangePasswordFormValues) =>
        mutate(
            { ...values, version },
            {
                onSuccess: async () => {
                    toast.success('Your password has been changed.');
                    return router.push('/profile');
                }
            }
        );

    return (
        <Container>
            <Title>Change Password</Title>

            <ChangePasswordForm
                profile={data}
                isLoading={isPending}
                onSubmit={onSubmit}
                options={
                    <ButtonLink href="/profile" variant="secondary">
                        Cancel
                    </ButtonLink>
                }
                className="mb-5"
            />

            <p className="text-sm text-gray-600">
                Forgotten your password?{' '}
                <TextLink href="/account/forgot-password">
                    Request reset
                </TextLink>
            </p>
        </Container>
    );
}
