import { useRouter } from 'next/router';
import { Meta } from '@/components/meta';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import {
    ForgotPasswordForm,
    ForgotPasswordFormValues
} from '@/features/account/components/forgot-password-form';
import { useForgotPassword } from '@/features/account/hooks/use-forgot-password';
import { useToast } from '@/hooks/use-toast';

const ForgotPasswordPage = () => {
    const router = useRouter();

    const { toast } = useToast();

    const { mutate, isPending } = useForgotPassword();

    const onSubmit = (values: ForgotPasswordFormValues) =>
        mutate(
            {
                ...values,
                siteUrl: window.location.origin
            },
            {
                onSuccess: async () => {
                    toast({
                        description:
                            'Instructions as to how to reset your password have been sent to you via email.'
                    });

                    return router.push('/account/login');
                }
            }
        );

    return (
        <>
            <Meta title="Forgot Password" />

            <Container>
                <Title>Forgot Password</Title>
                <ForgotPasswordForm isLoading={isPending} onSubmit={onSubmit} />
            </Container>
        </>
    );
};

export default ForgotPasswordPage;
