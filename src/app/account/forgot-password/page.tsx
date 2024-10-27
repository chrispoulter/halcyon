import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Title } from '@/components/title';

export const metadata: Metadata = {
    title: 'Forgot Password'
};

export default function ForgotPasswordPage() {
    return (
        <Container>
            <Title>Forgot Password</Title>
        </Container>
    );
}
