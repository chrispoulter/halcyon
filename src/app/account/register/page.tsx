import { Metadata } from 'next';
import { Container } from '@/components/container';
import { TextLink } from '@/components/text-link';
import { Title } from '@/components/title';

export const metadata: Metadata = {
    title: 'Register'
};

export default function RegisterPage() {
    return (
        <Container>
            <Title>Register</Title>

            <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <TextLink href="/account/login">Log in now</TextLink>
            </p>
        </Container>
    );
}
