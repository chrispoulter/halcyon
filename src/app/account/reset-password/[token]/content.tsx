'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import {
    ResetPasswordForm,
    ResetPasswordFormValues
} from '@/features/account/components/reset-password-form';
import { useResetPassword } from '@/features/account/hooks/use-reset-password';

type ResetPasswordContentProps = { token: string };

export default function ResetPasswordContent({
    token
}: ResetPasswordContentProps) {
    const router = useRouter();

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
