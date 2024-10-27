'use client';

// import { Metadata } from 'next';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import {
    ResetPasswordForm,
    ResetPasswordFormValues
} from '@/features/account/components/reset-password-form';
import { useResetPassword } from '@/features/account/hooks/use-reset-password';

// export const metadata: Metadata = {
//     title: 'Reset Password'
// };

type ResetPasswordPageParams = { token: string };

export default function ResetPasswordPage() {
    const router = useRouter();

    const { token } = useParams<ResetPasswordPageParams>();

    const { mutate, isPending } = useResetPassword();

    const onSubmit = (values: ResetPasswordFormValues) =>
        mutate(
            {
                token,
                ...values
            },
            {
                onSuccess: async () => {
                    toast.success('Your password has been reset.');
                    return router.push('/account/login');
                }
            }
        );

    return (
        <Container>
            <Title>Reset Password</Title>
            <ResetPasswordForm isLoading={isPending} onSubmit={onSubmit} />
        </Container>
    );
}
