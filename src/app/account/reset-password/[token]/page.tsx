import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Title } from '@/components/title';

export const metadata: Metadata = {
    title: 'Reset Password'
};

type ResetPasswordPageProps = {
    params: { token: string };
};

export default function ResetPasswordPage({
    params: { token }
}: ResetPasswordPageProps) {
    console.log(token);

    return (
        <Container>
            <Title>Reset Password</Title>
        </Container>
    );
}
