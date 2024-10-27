import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Title } from '@/components/title';
import { TextLink } from '@/components/text-link';

export const metadata: Metadata = {
    title: 'Change Password'
};

export default async function ChangePasswordPage() {
    return (
        <Container>
            <Title>Change Password</Title>

            <p className="text-sm text-gray-600">
                Forgotten your password?{' '}
                <TextLink href="/account/forgot-password">
                    Request reset
                </TextLink>
            </p>
        </Container>
    );
}
