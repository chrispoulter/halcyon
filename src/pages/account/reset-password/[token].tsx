import { useRouter } from 'next/router';
import { Meta } from '@/components/meta';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import {
    ResetPasswordForm,
    ResetPasswordFormValues
} from '@/features/account/components/reset-password-form';
import { useResetPassword } from '@/features/account/hooks/use-reset-password';
import { useToast } from '@/hooks/use-toast';

const ResetPasswordPage = () => {
    const router = useRouter();
    const token = router.query.token as string;

    const { toast } = useToast();

    const { mutate, isPending } = useResetPassword();

    const onSubmit = (values: ResetPasswordFormValues) =>
        mutate(
            {
                token,
                ...values
            },
            {
                onSuccess: async () => {
                    toast({ description: 'Your password has been reset.' });
                    return router.push('/account/login');
                }
            }
        );

    return (
        <>
            <Meta title="Reset Password" />

            <Container>
                <Title>Reset Password</Title>
                <ResetPasswordForm isLoading={isPending} onSubmit={onSubmit} />
            </Container>
        </>
    );
};

export default ResetPasswordPage;
