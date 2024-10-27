import { Metadata } from 'next';
import { Container } from '@/components/container';
import { Title } from '@/components/title';

export const metadata: Metadata = {
    title: 'My Account'
};

export default async function ProfilePage() {
    return (
        <Container>
            <Title>My Account</Title>
        </Container>
    );
}
