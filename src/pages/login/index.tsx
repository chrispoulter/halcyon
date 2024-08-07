import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Meta } from '@/components/Meta/Meta';
import { Container } from '@/components/Container/Container';
import { Title } from '@/components/Title/Title';
import { TextLink } from '@/components/TextLink/TextLink';
import {
    LoginForm,
    LoginFormValues
} from '@/features/account/LoginForm/LoginForm';

const LoginPage = () => {
    const router = useRouter();

    const callbackUrl = (router.query.callbackUrl as string) || '/';

    const onSubmit = async (values: LoginFormValues) => {
        const result = await signIn('credentials', {
            ...values,
            redirect: false,
            callbackUrl
        });

        if (!result?.ok) {
            toast.error(
                result?.error ||
                    'Sorry, something went wrong. Please try again later.'
            );
            return;
        }

        await router.push(result.url!);
    };

    return (
        <>
            <Meta title="Login" />

            <Container>
                <Title>Login</Title>
                <LoginForm onSubmit={onSubmit} className="mb-5" />

                <p className="text-sm leading-loose text-gray-600">
                    Not already a member?{' '}
                    <TextLink href="/register">Register now</TextLink>
                    <br />
                    Forgotten your password?{' '}
                    <TextLink href="/forgot-password">Request reset</TextLink>
                </p>
            </Container>
        </>
    );
};

export default LoginPage;
