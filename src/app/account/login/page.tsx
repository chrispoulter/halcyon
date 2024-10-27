import { Metadata } from 'next';
import { Container } from '@/components/container';
import { TextLink } from '@/components/text-link';
import { Title } from '@/components/title';

export const metadata: Metadata = {
    title: 'Login'
};

export default function LoginPage() {
    return (
        <Container>
            <Title>Login</Title>

            <p className="text-sm leading-loose text-gray-600">
                Not already a member?{' '}
                <TextLink href="/account/register">Register now</TextLink>
            </p>
            <p className="text-sm leading-loose text-gray-600">
                Forgotten your password?{' '}
                <TextLink href="/account/forgot-password">
                    Request reset
                </TextLink>
            </p>
        </Container>
    );
}
