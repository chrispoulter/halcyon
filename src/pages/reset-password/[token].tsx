import { useRouter } from 'next/router';
import { useResetPasswordMutation } from '@/redux/api';
import { Meta } from '@/components/Meta/Meta';
import { Container } from '@/components/Container/Container';
import { Title } from '@/components/Title/Title';
import {
    ResetPasswordForm,
    ResetPasswordFormValues
} from '@/features/account/ResetPasswordForm/ResetPasswordForm';

const ResetPasswordPage = () => {
    const router = useRouter();

    const token = router.query.token as string;

    const [resetPassword] = useResetPasswordMutation();

    const onSubmit = async (values: ResetPasswordFormValues) => {
        await resetPassword({
            token,
            ...values
        }).unwrap();

        await router.push('/login');
    };

    return (
        <>
            <Meta title="Reset Password" />

            <Container>
                <Title>Reset Password</Title>
                <ResetPasswordForm onSubmit={onSubmit} />
            </Container>
        </>
    );
};

export default ResetPasswordPage;
