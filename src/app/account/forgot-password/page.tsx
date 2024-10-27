'use client';

// import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import {
    ForgotPasswordForm,
    ForgotPasswordFormValues
} from '@/features/account/components/forgot-password-form';
import { useForgotPassword } from '@/features/account/hooks/use-forgot-password';

// export const metadata: Metadata = {
//     title: 'Forgot Password'
// };

export default function ForgotPasswordPage() {
    const router = useRouter();

    const { mutate, isPending } = useForgotPassword();

    const onSubmit = (values: ForgotPasswordFormValues) =>
        mutate(
            {
                ...values,
                siteUrl: window.location.origin
            },
            {
                onSuccess: async () => {
                    toast.success(
                        'Instructions as to how to reset your password have been sent to you via email.'
                    );

                    return router.push('/account/login');
                }
            }
        );

    return (
        <>
            <Container>
                <Title>Forgot Password</Title>
                <ForgotPasswordForm isLoading={isPending} onSubmit={onSubmit} />
            </Container>
        </>
    );
}
